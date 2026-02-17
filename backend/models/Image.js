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
}