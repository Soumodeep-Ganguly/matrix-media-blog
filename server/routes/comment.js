const express = require('express');
const router = express.Router();
const commentController = require('./../controllers/commentController')
const { authenticateToken } = require('./../utils/auth')

router.post('/comment', authenticateToken, commentController.create);
router.get('/comments/:blog', commentController.get);

module.exports = router;