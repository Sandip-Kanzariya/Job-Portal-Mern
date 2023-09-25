const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc    Registration user &
// @route   POST /user/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.send("HI, ");
    res.status(400);
    // throw new Error('User already exists');
    // @TODO : Server Crashed Handle it
  }

  // set token
  const user = await User.create({
    name,
    email,
    password,
  });

  generateToken(res, user._id);

  res.send("Added, ");
};

// @desc    Login user &
// @route   POST /user/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.send("LoggedIn");
  } else {
    res.send("failed login");
  }
};

// @desc    Logout user &
// @route   POST /user/logout
// @access  Private
const logoutUser = (req, res) => {
  // Clear token
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out" });
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
