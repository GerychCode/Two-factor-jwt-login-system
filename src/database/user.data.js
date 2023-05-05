import connection from "./conection.js";
export default {
    async findUserCoincidences(data) {
        try {
            const [rows] = await connection.execute('SELECT * FROM users WHERE login = ? OR email = ?', [data.login, data.email]);
            return rows;
        } catch (err) {
            console.error('Error getting duplicates:', err);
            return [];
        }
    },
    async createUser(login, email, password, key) {
        try {
            const [result] = await connection.execute(
                'INSERT INTO users (login, email, password, 2fa_key) VALUES (?, ?, ?, ?)',
                [login, email, password, key]
            );
            return result.insertId;
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    },
    async saveRefreshToken({ id, token }) {
        try {
            const [existingRows] = await connection.execute(
                'SELECT * FROM token_log WHERE owner_id = ?',
                [id]
            );
            if (existingRows.length > 0) {
                const result = await connection.execute(
                    'UPDATE token_log SET token = ? WHERE owner_id = ?',
                    [token, id]
                );
                return result[0].affectedRows;
            } else {
                const result = await connection.execute(
                    'INSERT INTO token_log (owner_id, token) VALUES (?, ?)',
                    [id, token]
                );
                return result[0].insertId;
            }
        } catch (error) {
            throw new Error(`Failed to add: ${error.message}`);
        }
    },
    async destroyToken(token) {
        try {
            const [rows] = await connection.execute('DELETE FROM token_log WHERE token = ?', [token]);
            return rows;
        } catch (err) {
            throw Error(err);
        }
    },
    async findUser(login) {
        try {
            const [rows] = await connection.execute('SELECT * FROM users WHERE login = ?', [login]);
            return rows;
        } catch (err) {
            console.error('Error getting duplicates:', err);
            return [];
        }
    },
}
