const Post = require("../models/postModel");

// @desc    List My Posts
// @route   POST company/post/my-posts
// @access  Private
const myPostsController = async (req, res) => {
  
  const posts = await Post.find({ company: req.user._id });

  res.send(posts);
};


// @desc    Get Post by id
// @route   POST company/post/:postid
// @access  Private
const getPostController = async (req, res) => {
  const post = await Post.findById(req.params.postid);

  res.send(post);
};


// @desc    change applied of post
// @route   PUT company/post/:postid
// @access  Private
const applyPostController = async (req, res) => {

  const post = await Post.findById(req.params.postid);

  const filter = { _id : req.params.postid };
  const update = { applied : [...post.applied, req.body.applied]};

  let doc = await Post.findOneAndUpdate(filter, update);

  res.send("");
};

// @desc    Add Post
// @route   POST company/post/add-post
// @access  Private
const addPostController = async (req, res) => {
  console.log(req.body);

  const { title, role, vacancy, description, url, company } = req.body;
  console.log("Photo : " + url);
  const post = await Post.create({
    title,
    role,
    vacancy,
    description,
    url,
    company,
  });

  res.send("add-post");
};

// @desc    Update Post
// @route   PUT company/post/update-post
// @access  Private
const updatePostController = async (req, res) => {
  res.send("update-post");
};

// @desc    Delete Post
// @route   DELETE company/post/delete-post
// @access  Private
const deletePostController = async (req, res) => {
  const result = await Post.deleteOne({ _id: req.params.id });
  res.send("delete-post");
};

module.exports = {
  addPostController,
  updatePostController,
  deletePostController,
  myPostsController,
  getPostController,
  applyPostController,
};
