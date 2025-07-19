const User = require('../models/user.model');

const UserRepo = {
  async createUser({ name, email, password }) {
    const user = new User({ name, email, password });
    return await user.save();
  },

  async findByEmail(email) {
    return await User.findOne({ email });
  },

  async findByUsername(username) {
    return await User.findOne({ username });
  },

  async findById(userId) {
    return await User.findById(userId);
  }
};

module.exports = UserRepo;
