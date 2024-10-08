const mongoose =  require('mongoose');
const Company = require("./companyModel");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Company"
    },
    applied : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
    
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', postSchema);


module.exports = Post;
