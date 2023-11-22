const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema(
    {
        recipeName:{type:String},
        description:{type:String},
        image:{type:String},
        ingredients:{type:[String]}
    },
    {
        collection:"Recipes",
    }
);
module.exports = mongoose.model("Recipes", recipeSchema)

