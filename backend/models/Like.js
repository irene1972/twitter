import pool from '../config/db.js';

export class Like {
    constructor(user_id, image_id) {
        this.id = 0;
        this.user_id = user_id;
        this.image_id = image_id;
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    async getByUser(){
        try {
            const result=await pool.query('SELECT * FROM likes WHERE user_id=?',[
                this.user_id
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async countLikesByImage(){
        try {
            const result=await pool.query(`
                SELECT image_id, count(image_id) as count 
                    FROM likes l 
                    GROUP BY image_id 
                    ORDER BY image_id DESC 
                `);
            return result;
        } catch (error) {
            return false;
        }
    }

    async insert() {
        try {
            const result = await pool.query('INSERT INTO likes (user_id,image_id,created_at,updated_at) VALUES (?,?,?,?,?)', [
                this.user_id, this.image_id, this.created_at, this.updated_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async delete(id) {
        try {
            const result = await pool.query('DELETE FROM likes WHERE id=?', [id]);
            return result;
        } catch (error) {
            return false;
        }
    }
}