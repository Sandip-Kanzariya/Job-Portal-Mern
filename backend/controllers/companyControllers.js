
const Company = require("../models/companyModel");


// @desc    Registration company & 
// @route   POST /company/admin/register
// @access  Public
const registerCompany = async (req, res) => {

    let {cname, email, password} = req.body;
  
    
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
        return res.status(400).json({msg: "Company already exists with this email"});
    }
    const company = await Company.create({
      cname,
      email,
      password,
    });
    res.status(200).json({msg: "Company Registered Successfully"});
}


// @desc    Login company & 
// @route   POST /company/admin/login
// @access  Public
const loginCompany = async (req,res)=>{
    const {email, password} = req.body;

    const company = await Company.findOne({email});

    if(!company){
        return res.status(400).json({msg: "Company Not Registered"});
    }

    if(company && (await company.matchPassword(password))){
        res.status(201).json({
            _id : company._id,
            cname : company.cname,
            email : company.email,
        })
    }else{
        return res.status(400).json({msg: "Wrong Password"});
    }
}

module.exports = {
    registerCompany,
    loginCompany,
}