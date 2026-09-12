const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userRoles = require('../utils/roles');
const { AuthMechanism } = require("mongodb");

//define schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"], //for custom error message
    unique: true, //it is helper not a validator, It tells MongoDB to create a unique index, so duplicate emails aren't allowed at the database level.
    validate: [validator.isEmail, "must be a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.MANAGER, userRoles.USER ],
    default: userRoles.USER
  },
  avatar: { //user image
    type: String,
    default: 'uploads/profile-image.png' //we store the name/link of the image 
  }
});

//اعمل الكود ده قبل عملية الـ save.
userSchema.pre("save", async function () {

  //Skip hashing if the password hasn't been changed  
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(8);

  this.password = await bcrypt.hash(this.password, salt);

});

//model
module.exports = mongoose.model("User", userSchema);
