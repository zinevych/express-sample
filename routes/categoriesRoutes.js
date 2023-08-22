const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensureRole = require('../middlewares/ensureRole');
const { roles } = require('../config/roles');

router.post('/', ensureAuthenticated, ensureRole([roles.ADMIN]), categoryController.createCategory);
router.get('/', categoryController.getAllCategories); // Everyone can view categories
router.get('/:id', categoryController.getCategoryById); // Everyone can view a specific category
router.put('/:id', ensureAuthenticated, ensureRole([roles.ADMIN]), categoryController.updateCategory);
router.delete('/:id', ensureAuthenticated, ensureRole([roles.ADMIN]), categoryController.deleteCategory);

module.exports = router;
