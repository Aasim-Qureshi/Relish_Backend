const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");

const FindByUserIdUC = {
    async execute({userId}){
        if(!userId){
            throw new AppError("User Id required", 400)
        }

        const recipes = RecipeRepo.findAllByUser(userId);
        return recipes || [];
    }
}

module.exports = FindByUserIdUC;