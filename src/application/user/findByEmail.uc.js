const AppError = require('../../shared/utils/AppError');
const UserRepo = require('../../infrastructure/repos/user.repo');

const FindByEmailUC = {
  async execute({ email }) {
    const user = await UserRepo.findByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
};

module.exports = FindByEmailUC;