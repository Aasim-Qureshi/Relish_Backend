const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");

const FindByIdUC = {
    async execute({recipeId}) {
        if (!recipeId){
            throw new AppError("Recipe Id required", 400)
        }

        const recipe = RecipeRepo.findById(recipeId);
        if(!recipe){
            throw new AppError("No recipe found", 404)
        }

        return recipe;
    }
}

module.exports = FindByIdUC;
