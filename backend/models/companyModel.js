const mongoose =  require('mongoose');
const bcrypt  =   require('bcryptjs');
const Post = require("./postModel");

const companySchema = mongoose.Schema(
  {
    cname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }]
  },
  {
    timestamps: true,
  }
);


// Encrypt password using bcrypt
companySchema.pre('save', async function (){

    const salt = await bcrypt.genSalt(10);
    this.password =  await bcrypt.hash(this.password, salt);

});

// Login Check : 
// Match user entered password to hashed password in database
companySchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Company = mongoose.model('Company',companySchema);


module.exports = Company;
