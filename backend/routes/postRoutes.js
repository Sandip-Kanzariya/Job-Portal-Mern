const express = require('express');
const {addPostController, updatePostController, deletePostController} = require('../controllers/postControllers');
const router = express.Router();

router.post("/add-post", addPostController);
router.put("/update-post/:id", updatePostController);
router.delete("/delete-post/:id", deletePostController);

router.get("/name", async (req, res) => res.send("Post Name"));

module.exports = router