const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");
const ImageHandler = require("../../infrastructure/cloudinary/imageHandler");

const CreateRecipeUC = {
  async execute({ recipeData, userId, imageFile }) {
    if (!recipeData || !userId) {
      throw new AppError("Recipe data and user ID required", 400);
    }

    if (typeof recipeData.ingredients === 'string') {
      try {
        recipeData.ingredients = JSON.parse(recipeData.ingredients);
      } catch {
        throw new AppError("Invalid ingredients format", 400);
      }
    }

    if (typeof recipeData.tags === 'string') {
      try {
        recipeData.tags = JSON.parse(recipeData.tags);
      } catch {
        throw new AppError("Invalid tags format", 400);
      }
    }

    if (!recipeData.title?.trim()) throw new AppError("Title required", 400);

    if (!Array.isArray(recipeData.ingredients) || !recipeData.ingredients.length) {
      throw new AppError("Ingredients required", 400);
    }

    if (!recipeData.instructions?.trim()) throw new AppError("Instructions required", 400);

    let imageUrl = null;
    if (imageFile) {
      if (!imageFile.mimetype.startsWith('image/')) {
        throw new AppError('Images only', 400);
      }

      const base64 = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString('base64')}`;
      imageUrl = await ImageHandler.upload(base64);
    }

    const recipe = await RecipeRepo.create({
      title: recipeData.title.trim(),
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions.trim(),
      tags: recipeData.tags || [],
      imageUrl
    }, userId);

    return recipe;
  }
};

module.exports = CreateRecipeUC;
