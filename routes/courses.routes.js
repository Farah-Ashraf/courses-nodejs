const express = require('express');
const courseController = require('../controllers/courses.controller');
const {validationSchema} = require('../middlewares/validationSchema');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/roles');

const router = express.Router();

router.route('/')
.get(courseController.getAllCourses)
.post(verifyToken, allowedTo(userRoles.MANAGER), validationSchema(), courseController.addCourse)



router.route('/:courseId')
.get(courseController.getCourseById)
.patch(verifyToken, allowedTo(userRoles.MANAGER), courseController.updateCourseById)
.delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER) , courseController.deleteCourseById)

module.exports = router;