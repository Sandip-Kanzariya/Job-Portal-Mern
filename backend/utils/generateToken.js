const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => { 
    // Generate Token based on userId 
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { 
    expiresIn: '30d',
  });

  // Send Cookie in response 
  
  res.cookie('jwt', token, {
    httpOnly: true, 
    // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  }).status(200).json({msg : "Successful Login"});
};

module.exports = { generateToken };