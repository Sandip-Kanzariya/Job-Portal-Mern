const { errorH } = require("../middleware/errorMiddleware");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc    Registration user &
// @route   POST /user/register
// @access  Public
const registerUser = async (req, res, next) => {

  try{

    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    
    if (userExists) {

      return res.status(409).json({error : "User Already Exsits"})
      // throw new Error('User already exists');
      // @TODO : Server Crashed Handle it
    }

    // set token
    const user = await User.create({
      name,
      email,
      password,
    });
    
    // generateToken(res, user._id);

    // const {} = user
    console.log(user);
    
    res.status(201).json(user);
  }
  catch(err){
    // res.status(500).json({error : err.message})
    next(errorH(500, "Something Went Wrong Bro"));
  }
};

// @desc    Login user &
// @route   POST /user/login
// @access  Public
const loginUser = async (req, res) => {

  try
  {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      // res.status(200).json({msg : "Successful Login"});

    } else {
      res.status(400).json({msg : "failed to Login"});
    }
  }
  catch(err){
    return res.status(500).json({error : err.message})
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
