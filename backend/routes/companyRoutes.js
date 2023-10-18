const express = require('express');
const {registerCompany, loginCompany, getCompany} = require('../controllers/companyControllers');
const { route } = require('./userRoutes');

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.get("/:cid", getCompany);

router.get("/name", async (req, res) => res.send("Company Name"));


module.exports = router