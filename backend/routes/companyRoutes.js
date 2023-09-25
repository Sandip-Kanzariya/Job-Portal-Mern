const express = require('express');
const {registerCompany, loginCompany} = require('../controllers/companyControllers');

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany);


router.get("/name", async (req, res) => res.send("Company Name"));

module.exports = router