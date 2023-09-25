
const Company = require("../models/companyModel");


// @desc    Registration company & 
// @route   POST /company/admin/register
// @access  Public
const registerCompany = async (req, res) => {

    let {cname, email, password, post} = req.body;
    // post = JSON.stringify(post)
    const posts = [post];
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
        res.send("HI, ");
        res.status(400);
        //   throw new Error('User already exists');
        // @TODO
    }
    const company = await Company.create({
      cname,
      email,
      password,
    //   posts
    });
    res.send("Added, Company");
}


// @desc    Login company & 
// @route   POST /company/admin/login
// @access  Public
const loginCompany = async (req,res)=>{
    const {email, password} = req.body;

    const company = await Company.findOne({email});

    if(company && (await company.matchPassword(password))){
        res.send("LoggedIn company");
    }else{
        res.send("failed login for company");
    }

}



module.exports = {
    registerCompany,
    loginCompany,

}