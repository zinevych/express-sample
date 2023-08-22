const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create(name);
        res.status(201).json({ category });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create category' });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve categories' });
    }
};

exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.getById(categoryId);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ category });
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve category' });
    }
};

exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    try {
        const category = await Category.update(categoryId, name, description);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ category });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update category' });
    }
};

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.delete(categoryId);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete category' });
    }
};
