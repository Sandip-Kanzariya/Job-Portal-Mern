const Post = require("../models/postModel");
const User = require("../models/userModel");
// @desc    List My Posts
// @route   POST company/post/my-posts
// @access  Private
const myPostsController = async (req, res) => {
  const posts = await Post.find({ company: req.user._id });

  res.send(posts);
};

// @desc    Get Post by id
// @route   GET company/post/:postid
// @access  Private
const getPostController = async (req, res) => {
  const post = await Post.findById(req.params.postid);
  res.send(post);
};

const getUsersController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);

    let userIdlist = post.applied;

    let userList = await Promise.all(

      userIdlist.map(async (id) => {
        
        let user = await User.findById(id);
        const { password, ...rest } = user._doc;
    
        return rest;
      })
    );
    
    res.send(userList);
  } catch (error) {
    // Handle errors here
    res.status(500).send('An error occurred');
  }
};

// @desc    change applied of post
// @route   PUT company/post/:postid
// @access  Private
const applyPostController = async (req, res) => {
  const post = await Post.findById(req.params.postid);

  if (post.applied.indexOf(req.body.applied) !== -1) {
    return res.status(400).json({ msg: "Already Applied For This Post" });
  }

  const filter = { _id: req.params.postid };
  const update = { applied: [...post.applied, req.body.applied] };

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
// @route   DELETE company/post/:postid
// @access  Private
const deletePostController = async (req, res) => {
  const result = await Post.deleteOne({ _id: req.params.postid });

  return res.status(201).json({ msg: "Post is deleted" });
};

// @route   GET company/post/search/:key
const seachPost = async (req, res) => {
  let result = await Post.find({
    $or: [
      { title: { $regex: req.params.key } },
      { role: { $regex: req.params.key } },
      { vacancy: { $regex: req.params.key } },
      { description: { $regex: req.params.key } },
    ],
  });

  res.send(result);
};

module.exports = {
  addPostController,
  updatePostController,
  deletePostController,
  myPostsController,
  getPostController,
  applyPostController,
  seachPost,
  getUsersController,
};
