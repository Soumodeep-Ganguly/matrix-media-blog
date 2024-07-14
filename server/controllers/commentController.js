const Blog = require('../models/blog');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
    try {
        const { content, blogId } = req.body;
        if (!content || !blogId) return res.status(400).json({ error: 'Content and blogId are required' });

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        const comment = new Comment({
            content,
            author: req.user.userId,
            blog: blogId
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.get = async (req, res) => {
    try {
        let query = { blog: req.params.blog }
        const comments = await Comment.find(query).populate('author', '-password');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};