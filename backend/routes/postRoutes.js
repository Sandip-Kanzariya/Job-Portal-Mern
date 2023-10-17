const express = require('express');
const {addPostController, updatePostController, deletePostController, myPostsController} = require('../controllers/postControllers');
const { route } = require('./userRoutes');
const router = express.Router();


router.get("/my-posts", myPostsController);
router.post("/add-post", addPostController);
router.put("/update-post/:id", updatePostController);
router.delete("/delete-post/:id", deletePostController);

router.get("/name", async (req, res) => res.send("Post Name"));

module.exports = router