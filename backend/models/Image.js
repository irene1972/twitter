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