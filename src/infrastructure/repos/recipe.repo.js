const Recipe = require('../models/recipe.model');

const RecipeRepo = {
    async create(recipeData, userId) {
        const recipe = await Recipe.create({
            ...recipeData,
            user: userId
        });
        return recipe;
    },

    async findById(recipeId) {
        const recipe = await Recipe.findById(recipeId);
        return recipe;
    },

    async findAllByUser(userId) {
        const recipes = await Recipe.find({ user: userId }).sort({ createdAt: -1 });
        return recipes;
    },

    async findByTag(tag) {
        const recipes = await Recipe.find({ tags: tag }).sort({ createdAt: -1 });
        return recipes;
    },

    async findAll() {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        return recipes;
    },


    async update(recipeId, updateData) {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {
            new: true,
            runValidators: true,
        });
        return updatedRecipe;
    },

    async delete(recipeId) {
        const deleted = await Recipe.findByIdAndDelete(recipeId);
        return deleted;
    },

    
};

module.exports = RecipeRepo;
