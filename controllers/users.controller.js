const asyncWrapper = require("../middlewares/asyncWrapper")
const User = require("../models/user.model")

const getAllUsers = asyncWrapper(
  async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    //get all users using user model
    const allUsers = await User.find({}, {"__v": false}).skip(skip).limit(limit); //the first object for filter, the scond for projection "i don't want to return __v in the response"

    res.json({ status: httpStatusText.SUCCESS, data: { users: allUsers } });
  }
) 

const signin = asyncWrapper(
    (req, res) => {

}
) 

const signup = asyncWrapper(
    (req, res) => {

}
) 

module.exports = {
    getAllUsers,
    signin,
    signup
}