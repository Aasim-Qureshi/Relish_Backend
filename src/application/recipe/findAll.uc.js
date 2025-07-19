const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");

const FindAllUC = {
  async execute() {
    const recipes = await RecipeRepo.findAll();

    return recipes || [];
  }
};

module.exports = FindAllUC;