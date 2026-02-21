import pool from '../config/db.js';

export class Comment{
    constructor(user_id,image_id,content){
        this.id=0;
        this.user_id=user_id;
        this.image_id=image_id;
        this.content=content;
        this.created_at=new Date();
        this.updated_at=new Date();
    }

    async getAll(image_id){
        try {
            const result=await pool.query(`
                SELECT c.*, u.nick 
                    FROM comments c 
                    INNER JOIN users u ON u.id=c.user_id 
					WHERE c.image_id=? 
                    ORDER BY id DESC 
                `,[image_id]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getCommentsByImg(){
        try {
            const result=await pool.query(`
                SELECT COUNT(c.image_id) as cantidad,max(i.id) as image_id 
                    FROM images i 
                    INNER JOIN comments c ON i.id=c.image_id 
                    group by c.image_id 
                    ORDER BY i.id 
                `);
            return result;
        } catch (error) {
            return false;
        }
    }

    async insertComment(){
        try {
            const result=await pool.query(`INSERT INTO comments (user_id,image_id,content,created_at,updated_at) VALUES (?,?,?,?,?)`,[
                this.user_id,this.image_id,this.content,this.created_at,this.updated_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async deleteComment(id){
        try {
            const result=await pool.query('DELETE FROM comments WHERE id=?',[id]);
            return result;
        } catch (error) {
            return false;
        }
    }
}