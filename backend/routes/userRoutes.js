const express = require('express');
const {registerUser, loginUser, logoutUser, profile } = require('../controllers/userControllers'); 
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/profile", profile);

// router.get(protect, "/name", async (req, res) => res.send("Name"));
router.get("/name", async (req, res) => res.send("Name"));

module.exports = router