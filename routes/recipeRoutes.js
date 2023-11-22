const express = require("express");
const router = express.Router();
const recipeSchema = require("../schema/RecipeSchema");
const { auth } = require("../config/jwt");
//add
router.post("/addrecipe", auth, (req,res,next) =>
{
    var recipeName = req.body.recipeName;
    var description = req.body.description;
    var image = req.body.image;
    var ingredients = req.body.ingredients;

    recipeName = recipeName.toLowerCase();
    description = description.toLowerCase();
    ingredients = ingredients.map(e => e.toLowerCase());
    // console.log(recipeName);
    // console.log(description);
    // console.log(ingredients);
    const data = {
        "recipeName": recipeName,
        "description": description,
        "image": image,
        "ingredients": ingredients
    }
    recipeSchema.create(data, (err,data)=>
    {
        if(err)
        {
            return next(err);
        }    
        else{
            res.json(data);
        }
    });
});

//get
router.get("/getRecipe", auth,(req,res,next)=>
{
    recipeSchema.find((err,data)=>{
        if(err)
        {
            return next(err);
        }
        else{
            return res.json(data);
        }
    });
});

// search by ingredients
  router.get('/search/:ingredients', auth, (req, res) => {

    let item = req.params.ingredients;
    item = item.toLowerCase();
    // console.log("des",description)
    // { $or: [{ "recipeName":ingredients  }, { "ingredients": ingredients }] }
    recipeSchema.find({ $or: [{ "recipeName":item  }, { "ingredients": item }] }).then(result => {
        // console.log("data", result.length)
        if(result.length == 0){
        res.status(404).json({
            status: false,
            message: "Data notfound"
        });
        }else{
            res.json({
                status: false,
                message: "Get data successfully",
                data: result
            });
        }
    }).catch(err => {
        console.log(err);
        res.json({
            status : "FAILED",
            message : "An error occurred while searching Recipe"
        })
    })
})

//delete
router.delete("/deleteRecipe/:id", auth,(req,res, next)=>
{
    recipeSchema.findByIdAndDelete(req.params.id,(err,data)=>
    {
        if (err) {
            return next(err);
          } else {
            return res.json("Deleted Successfully");
          }
    });
});


// update
router.put("/update/:id",auth, (req, res)=>{
    var recipeName = req.body.recipeName;
    var description = req.body.description;
    var image = req.body.image;
    var ingredients = req.body.ingredients;
    
    recipeName = recipeName.toLowerCase();
    description = description.toLowerCase();
    ingredients = ingredients.map(e => e.toLowerCase());
    const details = {
      "recipeName": recipeName,
      "description": description,
      "image": image,
      "ingredients": ingredients
    }
    recipeSchema.findByIdAndUpdate(req.params.id, {$set:details}, function(err, result) {
      if (err)
      {
        res.status(400).send({
          status: false,
          message:err
        });
      }else{
        res.send({
          status: true,
          message:"updated successfully",
          data: result
        });
      }
  })
  });
// get recipe by id
  router.get("/:id", auth,(req,res,next)=>
  {
      recipeSchema.find({"_id": req.params.id},(err,data)=>{
          if(err)
          {
              return res.send(err);
          }
          else{
              return res.json(data);
          }
      });
  });
module.exports = router;