const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require('../utils/appError');
const generateJWT = require('../utils/generateJWT');

const getAllUsers = asyncWrapper(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  //get all users using user model
  const allUsers = await User.find({}, { "__v": false , "password": false}).skip(skip).limit(limit); //the first object for filter, the scond for projection "i don't want to return __v in the response"

  res.json({ status: httpStatusText.SUCCESS, data: { users: allUsers } });
});


const signup = asyncWrapper(async (req, res, next) => {
  const { email, password, firstName, lastName, role } = req.body;

  const userFound = await User.findOne({email: email});

  if(userFound){
    const error = appError.create("user already found with this email", 400, httpStatusText.FAIL );

    return next(error);
  }

  console.log('file', req.file);
  

  const newUser = await User.create({ email, password, firstName, lastName, role, avatar: req.file.filename });

  const token = generateJWT({ email: email, id: newUser._id, userRole: role });

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser, token: token } });
});


const signin = asyncWrapper(
  async (req, res, next) => {
    const { email, password } = req.body;

    //check user found with this email
    const userFound = await User.findOne({ email });

    if (!userFound) {
    const error = appError.create(
      "Invalid email or password",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, userFound.password);

  if (!matchedPassword) {
    const error = appError.create(
      "Invalid email or password",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }

  //generate token
  const token = generateJWT({ email: email, id: userFound._id, userRole: userFound.role })

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      token: token
    }
  });
}
);


module.exports = {
  getAllUsers,
  signin,
  signup,
};
