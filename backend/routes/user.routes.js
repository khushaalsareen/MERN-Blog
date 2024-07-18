const express = require('express');
const { test, updateUser, deleteUser, signout, getUsers } = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');
const { verify } = require('jsonwebtoken');

const router = express.Router();

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout);
router.get('/getusers',verifyToken,getUsers);

module.exports = router