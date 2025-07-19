const jwt = require('jsonwebtoken');

const JWTService = {
  generateAccessToken(payload, expiresIn = '15m') {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn });
  },

  generateRefreshToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn });
  },

  verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  },

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  }
};

module.exports = JWTService;
