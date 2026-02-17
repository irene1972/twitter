import pool from '../config/db.js';

export class Like{
    constructor(user_id,image_id,content){
        this.id=0;
        this.user_id=user_id;
        this.image_id=image_id;
        this.created_at=new Date();
        this.updated_at=new Date();
    }
}