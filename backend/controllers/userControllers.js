const { errorH } = require("../middleware/errorMiddleware");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");
const bcrypt  =   require('bcryptjs');

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const nodemailer = require('nodemailer')

// @desc    Registration user &
// @route   POST /user/register
// @access  Public
const registerUser = async (req, res, next) => {
  let { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ msg: "User already exists with this email" });
  }

  const salt = await bcrypt.genSalt(10);
  password =  await bcrypt.hash(password, salt);

  try {
    
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ msg: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Something Went Wrong" });
  }
};

// @desc    Login user &
// @route   POST /user/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User Not exist with this email." });
  }

  try {

    if (user && (await user.matchPassword(password))) {
      // generateToken(res, user._id);

      const { password, ...rest } = user._doc;
      return res.status(201).json(rest);
      

    } else {
      return res.status(401).json({ msg: "Wrong Password" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something Went Wrong" });
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

// @desc    
// @route   PUT /user/update/:id
// @access  Private
const updateProfile = async (req, res) => {

  let user = await User.findOne({ _id: req.params.id });
  user.status = req.body.status;
  user = await user.save();

  res.status(200).json({ message: "User Profile" });
}

const sendAuthMail = async (req, res) => {
   // TODO :

   const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  
  
  let message = {
    from: process.env.EMAIL, // sender address
    // TODO: 
    to: '', // list of receivers 
    subject: "Verify Your Email", // Subject line
    text: "Hello, From Your next Job !", // plain text body
    html: "<b>Hello world?</b>", // html body
  }

  transporter.sendMail(message).then( ()=> {
    return res.status(201).json({msg : 'You have receive an emaail.'})
  }).catch(error => {
    return res.status(500).json({error})    
  })
  
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  updateProfile,

  sendAuthMail
};
