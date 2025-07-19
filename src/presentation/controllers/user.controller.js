const SignupUC = require('../../application/user/signup.uc');
const LoginUC = require('../../application/user/login.uc');
const FindByIdUC = require('../../application/user/findById.uc');
const FindByEmailUC = require('../../application/user/findByEmail.uc');

const catchAsync = require('../../shared/utils/catchAsync');

const UserController = {
  signup: catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await SignupUC.execute({ name, email, password });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  }),

  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await LoginUC.execute({ email, password });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000 
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  }),

  logout: catchAsync(async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  }),

  findUserById: catchAsync(async (req, res) => {
    const userId = req.params.id;

    const user = await FindByIdUC.execute({ userId });

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  }),

  findUserByEmail: catchAsync(async (req, res) => {
    const email = req.params.email;

    const user = await FindByEmailUC.execute({ email });

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  })
};

module.exports = UserController;
