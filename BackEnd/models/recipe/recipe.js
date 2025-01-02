const mongoose = require("mongoose");
//console.log(orderId)

mongoose.set("debug", true);

const RecipeStep = require("./recipeStep");
const User = require("../user");
const SpiceUp = mongoose.connection.useDb("SpiceUp");

const RecipeSchema = new mongoose.Schema({
  coverImageId: {
    type: String,
    require: true,
  },

  recipeName: {
    type: String,
    require: true,
  },

  status: {
    type: String,
    require: true,
    default: "RS1",
  },
  views: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
  },
  savedUserId: {
    type: [mongoose.Schema.Types.ObjectId],
    require: true,
    default: [],
  },

  ingredients: [
    {
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: String,
        require: true,
      },
      link: {
        type: String,
      },
    },
  ],

  description: {
    type: String,
    require: true,
  },
  cookingTimeInSecond: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    require: true,
  },

  step: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: RecipeStep,
      require: true,
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Recipe = SpiceUp.model("Recipe", RecipeSchema);

module.exports = Recipe;
