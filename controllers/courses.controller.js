const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");

//add course
const addCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          status: httpStatusText.FAIL,
          data: { errors: errors.array() },
        });
    }

    const newCourse = await Course.create(req.body);
    res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
  } catch (e) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: e.message });
  }
};

//get all courses
const getAllCourses = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const skip = (page - 1) * limit;

    //get all courses using course model
    const courses = await Course.find({}, {"__v": false}).skip(skip).limit(limit); //the first object for filter, the scond for projection "i don't want to return __v in the response"

    res.json({ status: httpStatusText.SUCCESS, data: { courses: courses } });
  } catch (e) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: e.message });
  }
};

//get specific course
const getCourseById = asyncWrapper(
    async (req, res, next) => {
  
    const { courseId } = req.params; //courseId will be string
    const course = await Course.findById({ _id: courseId });
    if (!course) {
        const error = new Error();
        error.message = 'not found course';
        error.statusCode = 404;
    //   return res
    //     .status(404)
    //     .json({ status: httpStatusText.FAIL, data: { course: null } });
    }
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { course: course } });

} )
//update specific course
const updateCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    //or use the set operator:  { $set: { ...req.body } }
    let updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    }); //"Return the updated document, not the old one."

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ status: httpStatusText.FAIL, data: { course: null } });
    }

    // Object.assign(course, req.body); //update same object inside the courses array

    res
      .status(200)
      .json({
        status: httpStatusText.SUCCESS,
        data: { course: updatedCourse },
      });
  } catch (e) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: e.message });
  }
};

//delete specific course
const deleteCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findByIdAndDelete({ _id: courseId });

    if (!course) {
      return res
        .status(404)
        .json({
          status: httpStatusText.FAIL,
          data: { course: "course not found" },
        });
    }

    // courses = courses.filter( (course) => course.id !== Number(courseId) ); //make sure to compare same type

    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (e) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: e.message });
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
