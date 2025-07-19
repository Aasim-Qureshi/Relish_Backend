const bcrypt = require('bcrypt');

const PasswordService = {
  async hashPassword(plainTextPassword) {
    const saltRounds = 10;
    return await bcrypt.hash(plainTextPassword, saltRounds);
  },

  async comparePasswords(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
};

module.exports = PasswordService;
