const express = require('express');
const recipeController = require('../controllers/recipe.controller');
const uploadImage = require('../../shared/middleware/multer.middleware');

const router = express.Router();

router.post('/create', uploadImage, recipeController.create);
router.post('/generate', recipeController.generate);

router.get('/id/:id', recipeController.findById);
router.get('/user/:userId', recipeController.findByUserId);
router.get('/current', recipeController.findByCurrentUserId);
router.get('/tag/:tag', recipeController.findByTag);
router.get('/all', recipeController.findAll);

router.patch('/update/:id', uploadImage, recipeController.update);
router.delete('/delete/:id', recipeController.delete);

module.exports = router;
