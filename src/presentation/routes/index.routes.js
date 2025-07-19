const express = require('express');
const authMiddleware = require('../../shared/middleware/auth.middleware');

const userRouter = require('./user.routes');
const recipeRouter = require('./recipe.routes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/recipes', authMiddleware, recipeRouter);

module.exports = router;
