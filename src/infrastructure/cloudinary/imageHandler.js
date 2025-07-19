const AppError = require('../../shared/utils/AppError');
const cloudinary = require('./config');

const ImageHandler = {
  async upload(image) {
    try {
      const result = await cloudinary.uploader.upload(image);
      return result.secure_url;
    } catch (error) {
      throw new AppError('Failed to upload image', 500);
    }
  }
};

module.exports = ImageHandler;