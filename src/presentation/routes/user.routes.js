const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../../shared/middleware/auth.middleware');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/email/:email', authMiddleware, userController.findUserByEmail);
router.get('/id/:id', authMiddleware, userController.findUserById);

module.exports = router;
