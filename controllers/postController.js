const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, content, categoryId } = req.body;
    const userId = req.user.id;  // Assuming you have middleware that sets req.user based on JWT token

    try {
        const newPost = await Post.create(title, content, userId, categoryId);
        res.status(201).json({ post: newPost });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Post creation failed' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(400).json({ error: 'Failed to retrieve posts' });
    }
};
