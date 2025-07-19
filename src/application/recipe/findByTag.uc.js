const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");

const FindRecipeByTagUC = {
  async execute({ tag }) {
    if (!tag) {
      throw new AppError("Tag required", 400);
    }

    const recipes = await RecipeRepo.findByTag(tag);

    return recipes;
  }
};

module.exports = FindRecipeByTagUC;