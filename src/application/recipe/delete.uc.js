const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");

const DeleteUC = {
    async execute({recipeId}) {
        if(!recipeId){
            throw new AppError("Recipe Id required", 400)
        }

        const deletedRecipe = RecipeRepo.delete(recipeId);
        if(!deletedRecipe){
            throw new AppError("Delete Failed", 500)
        }
        return deletedRecipe;
    }
}

module.exports = DeleteUC;