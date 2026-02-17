import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST, // o la IP del servidor
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DB
});

export default pool;