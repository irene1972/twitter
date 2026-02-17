import pool from '../config/db.js';

export class User{
    constructor(role,name,surname,nick,email,password,image){
        this.id=0;
        this.role=role;
        this.name=name;
        this.surname=surname;
        this.nick=nick;
        this.email=email;
        this.password=password;
        this.image=image;
        this.created_at=new Date();
        this.updated_at=new Date();
    }

    async getAll(){
        try {
            const result=await pool.query('SELECT * FROM users');
            return result;
        } catch (error) {
            return false;
        }
        
    }
}