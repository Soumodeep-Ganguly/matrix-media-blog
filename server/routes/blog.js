const express = require('express');
const router = express.Router();
const blogController = require('./../controllers/blogController')
const { authenticateToken } = require('./../utils/auth')

router.post('/blog', authenticateToken, blogController.create);
router.get('/blogs', blogController.get);
router.get('/blog/:id', blogController.getById);
router.put('/blog/:id', authenticateToken, blogController.update);
router.delete('/blog/:id', authenticateToken, blogController.delete);

module.exports = router;