const Blog = require('../models/blog');

module.exports.create = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

        const blog = new Blog({
            title,
            content,
            author: req.user.userId
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.log("TEST ERROR ", error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.get = async (req, res) => {
    try {
        let query = {}
        if(req.query.user) query.user = req.query.user
        const blogs = await Blog.find(query).populate('author', '-password');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', '-password');
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.update = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOne({ _id: req.params.id, author: req.user.userId });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        await blog.save();
        res.json(blog);        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.delete = async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, author: req.user.userId });

        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        await blog.remove();
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};