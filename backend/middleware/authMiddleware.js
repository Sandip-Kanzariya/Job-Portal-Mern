
const { json } = require('express');
const User  = require('../models/userModel');
const jwt = require('jsonwebtoken'); 

const protect = async (req, res, next) => {

  // Get Token 
  let token;
  token = req.cookies.jwt;


  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
      // throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401).json({ message: "Not authorized, token failed" });
    // throw new Error('Not authorized, no token');
  }
};

module.exports = {protect };
