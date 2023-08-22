const pool = require('../config/db');

class Category {
    static async create(name) {
        const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
        return result.rows[0];
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM categories');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    static async update(id, name, description) {
        const result = await pool.query('UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }
}

module.exports = Category;
