const express = require('express');
const {addPostController, updatePostController, deletePostController, myPostsController, getPostController, applyPostController} = require('../controllers/postControllers');
const { route } = require('./userRoutes');
const { get } = require('mongoose');
const router = express.Router();


router.get('/:postid', getPostController);
router.put('/:postid', applyPostController);

router.get("/my-posts", myPostsController);
router.post("/add-post", addPostController);
router.put("/update-post/:id", updatePostController);
router.delete("/delete-post/:id", deletePostController);

router.get("/name", async (req, res) => res.send("Post Name"));

module.exports = router