const CreateRecipeUC = require("../../application/recipe/create.uc");
const FindByIdUC = require("../../application/recipe/findById.uc");
const FindByUserIdUC = require("../../application/recipe/findByUserId.uc");
const FindByTagUC = require("../../application/recipe/findByTag.uc");
const FindAllUC = require("../../application/recipe/findAll.uc");
const UpdateRecipeUC = require("../../application/recipe/update.uc");
const GenerateRecipeUC = require("../../application/recipe/generate.uc");
const DeleteRecipeUC = require("../../application/recipe/delete.uc");

const catchAsync = require("../../shared/utils/catchAsync");

const RecipeController = {
  create: catchAsync(async (req, res) => {

    console.log("File:", req.file);

    const recipe = await CreateRecipeUC.execute({
      recipeData: req.body,
      userId: req.userId,
      imageFile: req.file
    });

    res.status(201).json({
      status: "success",
      data: recipe
    });
  }),

  findById: catchAsync(async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await FindByIdUC.execute({ recipeId });

    res.status(200).json({
      status: "success",
      data: recipe
    });
  }),

  findByUserId: catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const recipes = await FindByUserIdUC.execute({ userId });

    res.status(200).json({
      status: "success",
      data: recipes
    });
  }),

  findByCurrentUserId: catchAsync(async (req, res) => {
    const userId = req.userId;
    console.log("User ID:", userId);
    const recipes = await FindByUserIdUC.execute({ userId });

    res.status(200).json({
      status: "success",
      data: recipes
    });
  }),

  findByTag: catchAsync(async (req, res) => {
    const tag = req.params.tag;
    const recipes = await FindByTagUC.execute({ tag });

    res.status(200).json({
      status: "success",
      data: recipes
    });
  }),

  findAll: catchAsync(async (req, res) => {
    const recipes = await FindAllUC.execute();

    res.status(200).json({
      status: "success",
      data: recipes
    });
  }),

  update: catchAsync(async (req, res) => {
    const recipeId = req.params.id;
    const updatedData = req.body;

    const updated = await UpdateRecipeUC.execute({
      recipeId,
      updatedData
    });

    res.status(200).json({
      status: "success",
      data: updated
    });
  }),

  generate: catchAsync(async (req, res) => {
    const { ingredients } = req.body;
    const userId = req.userId;
    const recipe = await GenerateRecipeUC.execute({ ingredients, userId });

    res.status(201).json({
      status: "success",
      data: recipe
    });
  }),

  delete: catchAsync(async (req, res) => {
    const recipeId = req.params.id;

    const deleted = await DeleteRecipeUC.execute({ recipeId });

    res.status(200).json({
      status: "success",
      data: deleted
    });
  })
};

module.exports = RecipeController;
