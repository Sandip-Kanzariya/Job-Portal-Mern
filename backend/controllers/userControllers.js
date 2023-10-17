const { errorH } = require("../middleware/errorMiddleware");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc    Registration user &
// @route   POST /user/register
// @access  Public
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(errorH(409, "User Already Exsits"));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({msg : "User Registered Successfully"});
  } catch (err) {
    next(500, "Something Went Wrong");
  }
};

// @desc    Login user &
// @route   POST /user/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
    res.status(404).json({message : "User Not Found"});

    }

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
    } else {
      res.status(401).json({message : "Invalid Credentials"});
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Logout user &
// @route   POST /user/logout
// @access  Private
const logoutUser = (req, res) => {
  // Clear token
  // res.cookie("jwt", "", {
  //   httpOnly: true,
  //   expires: new Date(0),
  // });
  // res.status(200).json({ message: "Logged Out" });

  res.clearCookie("jwt").status(200).json({ message: "Logged Out" });
};

// @desc    Profile of user &
// @route   POST /user/profile
// @access  Private
const profile = (req, res) => {
  res.status(200).json({ message: "User Profile" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  profile,
};
