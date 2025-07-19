const AppError = require('../../shared/utils/AppError');
const UserRepo = require('../../infrastructure/repos/user.repo');
const PasswordService = require('../../infrastructure/services/password.service');

const SignupUC = {
  async execute({ name, email, password }) {

    const existingUser = await UserRepo.findByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await PasswordService.hashPassword(password);
    const user = await UserRepo.createUser({ name, email, password: hashedPassword });

    return user;
  }
};

module.exports = SignupUC;