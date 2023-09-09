
const User = require("../models/userModel");



// @desc    Registration user & 
// @route   POST /user/
// @access  Public
const registerUser = async (req, res) => {

    const {name, email, password} = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.send("HI, ");
        res.status(400);
        //   throw new Error('User already exists');
        // @TODO
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
    
}


// @desc    Login user & 
// @route   POST /user/login
// @access  Public
const loginUser = async (req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.send("LoggedIn");
    }else{
        res.send("failed login");
    }

}



module.exports = {
    registerUser,
    loginUser,

}