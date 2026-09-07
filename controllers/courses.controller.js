const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require('../utils/appError');

//add course
const addCourse = asyncWrapper(
  async (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = appError.create(errors.array(), 400, httpStatusText.FAIL)
      return next(error);
    }

    const newCourse = await Course.create(req.body);
    res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
}
) 

//get all courses
const getAllCourses = asyncWrapper(
  async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    //get all courses using course model
    const courses = await Course.find({}, {"__v": false}).skip(skip).limit(limit); //the first object for filter, the scond for projection "i don't want to return __v in the response"

    res.json({ status: httpStatusText.SUCCESS, data: { courses: courses } });
  }
) 

//get specific course
const getCourseById = asyncWrapper(
    async (req, res, next) => {
  
    const { courseId } = req.params; //courseId will be string
    const course = await Course.findById({ _id: courseId });

    if (!course) {
      const error = appError.create('not found course', 404, httpStatusText.FAIL);
      return next(error);
    }
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { course: course } });

} )


//update specific course
const updateCourseById = asyncWrapper(async (req, res, next) => {

    const courseId = req.params.courseId;

    //or use the set operator:  { $set: { ...req.body } }
    let updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    }); //"Return the updated document, not the old one."

    if (!updatedCourse) {
      const error = appError.create("course not found to update", 404, httpStatusText.FAIL)
      return next(error);
    }

    // Object.assign(course, req.body); //update same object inside the courses array

    res
      .status(200)
      .json({
        status: httpStatusText.SUCCESS,
        data: { course: updatedCourse },
      });
}
) 

//delete specific course
const deleteCourseById = asyncWrapper(
  async (req, res, next) => {

    const courseId = req.params.courseId;

    const course = await Course.findByIdAndDelete({ _id: courseId });

    if (!course) {
      const error = appError.create("course not found", 404, httpStatusText.FAIL);
      return next(error);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
}
) 

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
