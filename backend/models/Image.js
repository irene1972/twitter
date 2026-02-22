import pool from '../config/db.js';

export class Image{
    constructor(user_id,image_path,description){
        this.id=0;
        this.user_id=user_id;
        this.image_path=image_path;
        this.description=description;
        this.created_at=new Date();
        this.updated_at=new Date();
    }

    async getAll(){
        try {
            const result=await pool.query(`
                SELECT i.*,u.name,u.surname,u.nick,u.image,i.id as image_id    
                    FROM images i 
                    INNER JOIN users u ON u.id=i.user_id 
                    ORDER BY i.id DESC
                `);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getById(id){
        try {
            const result=await pool.query(`
                SELECT i.*,u.name,u.surname,u.nick,u.image  
                    FROM images i 
                    INNER JOIN users u ON u.id=i.user_id 
                    WHERE i.id=?
                `,[id]);
            return result;
        } catch (error) {
            return false;
        }
    }
    
    async insert() {
        try {
            const result = await pool.query('INSERT INTO images (user_id,image_path,description,created_at,updated_at) VALUES (?,?,?,?,?)', [
                this.user_id,this.image_path, this.description, this.created_at, this.updated_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }
}