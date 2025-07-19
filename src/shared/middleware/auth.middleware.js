const JWTService = require('../../infrastructure/services/jwt.service');
const AppError = require('../../shared/utils/AppError');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  try {
    if (accessToken) {
      const decoded = JWTService.verifyAccessToken(accessToken);
      req.user = { id: decoded.userId };
      req.userId = decoded.userId; // <- Add this line
      return next();
    }

    if (refreshToken) {
      const decoded = JWTService.verifyRefreshToken(refreshToken);

      const newAccessToken = JWTService.generateAccessToken({ userId: decoded.userId });
      const newRefreshToken = JWTService.generateRefreshToken({ userId: decoded.userId });

      res.cookie('accessToken', newAccessToken, cookieOptions);
      res.cookie('refreshToken', newRefreshToken, cookieOptions);

      req.user = { id: decoded.userId };
      req.userId = decoded.userId; // <- Add this line
      return next();
    }

    throw new AppError('Authentication required. No token provided.', 401);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Token has expired. Please log in again.', 401));
    }

    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }

    return next(new AppError('Authentication failed.', 401));
  }
};

module.exports = authMiddleware;
