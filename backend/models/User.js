import pool from '../config/db.js';

export class User {
    constructor(name, email, password,remember_token, image = null, role = 'user', surname = null, nick = null,) {
        this.id = 0;
        this.role = role;
        this.name = name;
        this.surname = surname;
        this.nick = nick;
        this.email = email;
        this.password = password;
        this.image = image;
        this.confirmado=null;
        this.remember_token=remember_token;
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    async getAll() {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result;
        } catch (error) {
            return false;
        }

    }

    async getByEmail(email) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE email=?',[email]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getByToken(token){
        
        try {
            const result = await pool.query('SELECT * FROM users WHERE remember_token=?',[token]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async updateConfirmado(email){
        try {
            const result = await pool.query('UPDATE users SET confirmado=1,remember_token=null WHERE email=?',[email]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async insert() {
        try {
            const result = await pool.query('INSERT INTO users (role,name,email,password,remember_token,created_at,updated_at) VALUES (?,?,?,?,?,?,?)', [
                this.role, this.name, this.email, this.password,this.remember_token, this.created_at, this.updated_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }
}