const AppError = require('../../shared/utils/AppError');
const UserRepo = require('../../infrastructure/repos/user.repo');

const FindByIdUC = {
  async execute({ userId }) {
    const user = await UserRepo.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
};

module.exports = FindByIdUC;