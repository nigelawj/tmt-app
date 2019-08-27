const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // If no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //decoded jwt is the whole user object
    req.user = decoded.user; // place it in the req
    next();
  } catch (err) {
    // Invalid token
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
