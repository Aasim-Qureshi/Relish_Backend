const AppError = require("../../shared/utils/AppError");
const RecipeRepo = require("../../infrastructure/repos/recipe.repo");
const generateRecipe = require("../../infrastructure/ai/aiHandler");

const GenerateUC = {
  async execute({ ingredients: ingredientList, userId }) {
    const cleanedIngredients = ingredientList.ingredients
      .map(i => i.trim())
      .filter(i => i.length > 0);

    if (cleanedIngredients.length === 0) {
      throw new AppError("Ingredients cannot be empty.", 400);
    }

    const prompt = createPrompt(cleanedIngredients);
    const generated = await generateRecipe(prompt);

    const recipeData = {
      title: generated.title,
      ingredients: generated.ingredients,
      instructions: generated.instructions,
      imageUrl: "https://c.files.bbci.co.uk/AB75/production/_122239834_moleyrobotics2.jpg",
    };

    const recipe = await RecipeRepo.create(recipeData, userId);
    return recipe;
  }
};


const createPrompt = (ingredients) => {
  const list = ingredients.join(', ');
  return `
You are a helpful recipe generator. Given the following ingredients: ${list}, generate a JSON object with the following structure:

{
  "title": "<recipe title>",
  "instructions": "<step-by-step cooking instructions>"
}

Only output the JSON object. No additional commentary.`;
};


module.exports = GenerateUC;
