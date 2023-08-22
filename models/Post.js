const pool = require('../config/db');

class Post {
    static async create(title, content, userId, categoryId) {
        const result = await pool.query('INSERT INTO posts (title, content, author_id, category_id) VALUES ($1, $2, $3, $4) RETURNING *', 
            [title, content, userId, categoryId]
        );
        return result.rows[0];
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        return result.rows;
    }
}
module.exports = Post;
