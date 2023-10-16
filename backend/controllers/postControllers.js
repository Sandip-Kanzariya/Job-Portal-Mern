const Post = require("../models/postModel");

// @desc    Add Post 
// @route   POST company/post/add-post
// @access  Private
const addPostController = async (req, res) => {

    console.log(req.body)
    
    const {title, role, vacancy, description, url}  = req.body;
    console.log("Photo : " + url);
    const post = await Post.create({
        title,
        role, 
        vacancy, 
        description,
        url
    });
    
    res.send("add-post");
}

// @desc    Update Post 
// @route   PUT company/post/update-post
// @access  Private
const updatePostController = async (req, res) => {
    
    res.send("update-post");
    
}
// @desc    Delete Post 
// @route   DELETE company/post/delete-post
// @access  Private
const deletePostController = async (req, res) => {

    const result = await Post.deleteOne({_id:req.params.id}) 
    res.send("delete-post");
}



module.exports = {
    addPostController,
    updatePostController,
    deletePostController,
}
