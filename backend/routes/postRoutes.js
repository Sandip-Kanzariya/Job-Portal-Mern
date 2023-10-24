const express = require('express');
const {addPostController, updatePostController, deletePostController, myPostsController, getPostController, applyPostController, seachPost, getUsersController} = require('../controllers/postControllers');
const { route } = require('./userRoutes');
const { get } = require('mongoose');
const router = express.Router();


router.get('/:postid', getPostController);
router.get('/users/:postid', getUsersController)
router.put('/:postid', applyPostController);
router.delete("/:postid", deletePostController);

router.get("/my-posts", myPostsController);
router.post("/add-post", addPostController);
router.put("/update-post/:id", updatePostController);
router.get("/search/:key", seachPost);

router.get("/name", async (req, res) => res.send("Post Name"));

module.exports = router