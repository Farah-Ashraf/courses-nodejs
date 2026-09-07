const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();

//get all users
//register
//login

router.route('/')
.get(userController.getAllUsers)

 
router.route('/signup')
.post(userController.signup)


router.route('/signin')
.post(userController.signin)

module.exports = router;