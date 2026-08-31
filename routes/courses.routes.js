const express = require('express');
const courseController = require('../controllers/courses.controller');
const {validationSchema} = require('../middlewares/validationSchema');

const router = express.Router();

router.route('/')
.get(courseController.getAllCourses)
.post(validationSchema(), courseController.addCourse)



router.route('/:courseId')
.get(courseController.getCourseById)
.patch(courseController.updateCourseById)
.delete(courseController.deleteCourseById)

module.exports = router;