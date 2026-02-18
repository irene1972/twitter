import pool from '../config/db.js';

export class User {
    constructor(name, email, password, image = null, role = 'user', surname = null, nick = null,) {
        this.id = 0;
        this.role = role;
        this.name = name;
        this.surname = surname;
        this.nick = nick;
        this.email = email;
        this.password = password;
        this.image = image;
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

    async insert() {
        try {
            const result = await pool.query('INSERT INTO users (role,name,email,password,created_at,updated_at) VALUES (?,?,?,?,?,?)', [
                this.role, this.name, this.email, this.password, this.created_at, this.updated_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }
}