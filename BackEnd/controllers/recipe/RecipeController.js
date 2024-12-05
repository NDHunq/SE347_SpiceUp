const connectToDb = require("../../config/db/db");
const Recipe = require("../../models/recipe/recipe");
const RecipeStep = require("../../models/recipe/recipeStep");
const Comment = require("../../models/feedBack/comment");

class RecipeController {
  //[POST] create neww Recipe
  async createRecipe(req, res) {
    try {
      await connectToDb();

      const {
        recipeName,
        description,
        cookingTimeInSecond,
        userId,
        recipeIds,
        type,
        ingredients,
      } = req.body;
      const recipe = new Recipe({
        recipeName: recipeName,
        userId: userId,
        description: description,
        cookingTimeInSecond: cookingTimeInSecond,
        tag: type,
        createdAt: new Date(),
        step: recipeIds,
        ingredients: ingredients,
      });

      await recipe.save();

      res.status(201).json({
        id: recipe._id,
        message: "Create recipe successfully",
      });
    } catch (e) {
      //res.status(500).send('Some errors happen', e)
      console.log(e);
    }
  }

  async updateRecipe(req, res) {
    try {
      await connectToDb();
      //const { email } = req.query
      const { recipe_id } = req.params;
      const recipe = await Recipe.findOne({ _id: recipe_id, isDeleted: false });

      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          recipe[key] = req.body[key];
        }
      }

      await recipe.save();

      res.status(201).json({
        message: "Update recipe successfully",
      });
    } catch (e) {
      //res.status(500).send('Some errors happen', e)
      console.log(e);
    }
  }

  async deleteRecipe(req, res) {
    try {
      connectToDb();
      const { recipe_id } = req.params;

      const recipe = await Recipe.findOne({ _id: recipe_id });
      recipe.isDeleted = true;

      recipe.save();

      res.status(200).send("Delete recipe successfully");
    } catch (e) {
      //res.status(500).send("Internal server error")
      console.log("Error", e);
    }
  }

  async createStep(req, res) {
    try {
      await connectToDb();

      let recipeIds = [];
      for (let i = 0; i < req.body.length; i++) {
        const { stepNumber, description, image } = req.body[i];

        const recipeStep = new RecipeStep({
          stepNumber: stepNumber,
          description: description,
          image: image,
        });

        await recipeStep.save();

        recipeIds.push(recipeStep._id);
      }

      res.status(201).json({
        recipeIds: recipeIds,
        message: "Create step successfully",
      });
    } catch (e) {
      console.log("error", e);
    }
  }

  async updateStep(req, res) {
    try {
      await connectToDb();

      const { step_id } = req.params;
      console.log("step_id", step_id);
      const recipeStep = await RecipeStep.findOne({ _id: step_id });
      console.log("recipe step", recipeStep);
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          recipeStep[key] = req.body[key];
        }
      }

      await recipeStep.save();
      res.status(201).json({
        message: "Update step sucessfully",
      });
    } catch (e) {
      //res.status(500).send("Internal server error")
      console.log("Error", e);
    }
  }

  async deleteStep(req, res) {
    try {
      connectToDb();
      const { step_id } = req.params;

      const recipe = await RecipeStep.findOne({ _id: step_id });
      recipe.isDeleted = true;

      recipe.save();

      res.status(200).send("Delete recipe step successfully");
    } catch (e) {
      res.status(500).send("Internal server error");
      console.log("Error", e);
    }
  }

  async getRecipe(req, res) {
    try {
      await connectToDb();
      const { user_id } = req.params;
      const { recipe_id } = req.params;
      console.log("user_id", user_id);
      console.log("recipe_id", recipe_id);
      if (user_id) {
        const recipe = await Recipe.find({
          userId: user_id,
          isDeleted: false,
        })
          .populate("step")
          .populate("userId");
        if (recipe) {
          return res.status(200).json(recipe);
        } else {
          return res.status(404).send("No recipe found");
        }
      }

      if (recipe_id) {
        const recipe = await Recipe.findOne({
          _id: recipe_id,
          isDeleted: false,
        }).populate("step");
        if (recipe) {
          return res.status(200).json(recipe);
        } else {
          return res.status(404).send("No recipe found");
        }
      }

      const recipe = await Recipe.find({ isDeleted: false })
        .populate("step")
        .populate("userId");
      if (recipe) {
        return res.status(200).json(recipe);
      } else {
        return res.status(404).send("No recipe found");
      }
    } catch (e) {
      console.log("error", e);
      return res.status(500).json({
        message: "Iternal server error",
      });
    }
  }
  // async delete(req,res) {
  //     res.status(204).send();
  async increaseView(req, res) {
    try {
      await connectToDb();

      const { recipe_id } = req.params;
      const recipe = await Recipe.findOne({ _id: recipe_id, isDeleted: false });
      recipe.views = recipe.views + 1;
      console.log("recipe.views", recipe.views);
      await recipe.save();
      // await Recipe.updateOne(
      //     { _id: id },
      //     {
      //         '$inc': {
      //             'views': 1
      //         }
      //     }
      // )

      res.status(200).send("Update views successfully");
    } catch (e) {
      console.log("some errors happen", e);
    }
  }

  async getView(req, res) {
    try {
      await connectToDb();

      const { recipe_id } = req.params;

      const recipe = await Recipe.findOne({ _id: recipe_id, isDeleted: false });

      return res.status(200).json({
        views: recipe.views,
      });
    } catch (e) {
      console.log("some errors happen", e);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async updateStatus(req, res) {
    try {
      await connectToDb();

      const { status } = req.query;
      const { recipe_id } = req.params;

      const recipe = await Recipe.findOne({ _id: recipe_id });

      recipe.status = status;
      recipe.save();

      res.status(200).json({
        message: "Update status succesfully",
      });
    } catch (e) {
      console.log("some errors happen", e);
    }
  }

  async setSaveState(req, res) {
    try {
      await connectToDb();

      const { user_id } = req.body;
      const { recipe_id } = req.params;

      const recipe = await Recipe.findOne({ _id: recipe_id });
      if (!recipe) {
        return res.status(404).json({
          message: "Recipe not found",
        });
      }

      if (recipe.savedUserId.includes(user_id)) {
        const newsavedUserId = [];
        for (let i = 0; i < recipe.savedUserId.length; i++) {
          if (recipe.savedUserId[i].toString() === user_id) {
          } else {
            newsavedUserId.push(recipe.savedUserId[i]);
          }
        }
        recipe.savedUserId = newsavedUserId;
      } else {
        recipe.savedUserId.push(user_id);
      }

      await recipe.save();

      return res.status(200).json({
        message: "Updated saved user successfully",
      });
    } catch (e) {
      console.log("Some errors happened", e);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  async getSavedRecipe(req, res) {
    try {
      await connectToDb();

      const { user_id } = req.params;

      const recipe = await Recipe.find({
        savedUserId: { $in: [user_id] },
        isDeleted: false,
      });

      if (recipe) {
        return res.status(200).json(recipe);
      }
    } catch (e) {
      console.log("some errors happen", e);
      return res.status(404).json({
        message: "Recipe not found",
      });
    }
  }
}

module.exports = new RecipeController();
