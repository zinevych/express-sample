const express = require('express');
const router = express.Router();

const blogController = require('../controllers/postController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

router.post('/', ensureAuthenticated, blogController.createPost);
router.get('/', blogController.getPosts);

module.exports = router;
