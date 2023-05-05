import mysql from 'mysql2/promise';

export default await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: '2fa'
});