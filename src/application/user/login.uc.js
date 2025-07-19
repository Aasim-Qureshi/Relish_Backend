const AppError = require('../../shared/utils/AppError');
const UserRepo = require('../../infrastructure/repos/user.repo');
const PasswordService = require('../../infrastructure/services/password.service');
const JWTService = require('../../infrastructure/services/jwt.service');

const LoginUC = {
  async execute({ email, password }) {
    const user = await UserRepo.findByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordCorrect = await PasswordService.comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError('Incorrect password', 401);
    }

    const accessToken = JWTService.generateAccessToken({ userId: user._id });
    const refreshToken = JWTService.generateRefreshToken({ userId: user._id });

    return { accessToken, refreshToken, user };
  }
};

module.exports = LoginUC;
