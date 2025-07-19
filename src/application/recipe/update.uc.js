const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");

const UpdateRecipeUC = {
    async execute({recipeId, updatedData}) {
        if(!recipeId){
            throw new AppError("Id is required", 400)
        }

        if(!updatedData) {
            throw new AppError("Updated Data is required", 400)
        }

        const updatedRecipe = RecipeRepo.update(recipeId, updatedData);
        if(!updatedRecipe){
            throw new AppError("Update Failed", 500)
        }

        return updatedRecipe;
    }
}

module.exports = UpdateRecipeUC;