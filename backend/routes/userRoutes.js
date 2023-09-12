const express = require('express');
const {registerUser, loginUser } = require('../controllers/userControllers') 
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/name", async (req, res) => res.send("Name"));
module.exports = router