const mongoose =  require('mongoose');


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
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', postSchema);


module.exports = Post;
