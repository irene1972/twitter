import pool from '../config/db.js';
import mysql from 'mysql2/promise';

export class User {
    constructor(name, email, password, remember_token, surname = null, nick = null, image = null, role = 'user') {
        this.id = 0;
        this.role = role;
        this.name = name;
        this.surname = surname;
        this.nick = nick;
        this.email = email;
        this.password = password;
        this.image = image;
        this.confirmado = null;
        this.remember_token = remember_token;
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
            const result = await pool.query('SELECT * FROM users WHERE email=?', [email]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async getByToken(token) {

        try {
            const result = await pool.query('SELECT * FROM users WHERE remember_token=?', [token]);
            return result;
        } catch (error) {
            return false;
        }
    }

    async updateConfirmado(email) {
        
        try {
            const result = await pool.query('UPDATE users SET confirmado=1,remember_token=null, updated_at=? WHERE email=?',[this.updated_at,email]);
            console.log(result);
            return result;
        } catch (error) {
            return false;
        }
        
        //debug sql
        /*
        const sql = `UPDATE users SET confirmado=1,remember_token=null, updated_at=? WHERE email=?`;

        const values = [this.updated_at, email];

        console.log(mysql.format(sql, values));

        const result = await pool.query(sql, values);
        return result;
        */
    }

    async updateByEmail(nick,name,surname,new_email,old_email){
        try {
        
            const result = await pool.query('UPDATE users SET nick=?,name=?, surname=?, email=?, updated_at=? WHERE email=?',[nick,name,surname,new_email,this.updated_at,old_email]);
            console.log(result);
            return result;
            
        } catch (error) {
            return false;
        }
    }

    async updateByEmailConImagen(nick,name,surname,new_email,imagen,old_email){
        try {
        
            const result = await pool.query('UPDATE users SET nick=?,name=?, surname=?, email=?,image=?, updated_at=? WHERE email=?',[nick,name,surname,new_email,imagen,this.updated_at,old_email]);
            console.log(result);
            return result;
            
        } catch (error) {
            return false;
        }
    }

    async insert() {
        try {
            const result = await pool.query('INSERT INTO users (role,name,email,password,remember_token,surname,nick,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)', [
                this.role, this.name, this.email, this.password, this.remember_token, this.surname, this.nick, this.created_at, this.updated_at
            ]);
            return result;
        } catch (error) {
            return false;
        }
    }
}