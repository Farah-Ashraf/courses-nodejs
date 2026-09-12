const express = require('express');
const userController = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/upload');

const router = express.Router();

//get all users
//register
//login

router.route('/')
.get(verifyToken, userController.getAllUsers)

 
router.route('/signup')
.post(upload.single('avatar'), userController.signup)


router.route('/signin')
.post(userController.signin)

module.exports = router;