const express = require('express');
const { createComment, getPostComments } = require('../controllers/comment.controller');
const { verifyToken } = require('../utils/verifyUser');
const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId', getPostComments);

module.exports = router