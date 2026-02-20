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
}