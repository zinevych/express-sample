const pool = require('../config/db');

class User {
    static async register(username, email, hashedPassword, role) {
        const result = await pool.query('INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *', 
            [username, email, hashedPassword, role]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
}

module.exports = User;