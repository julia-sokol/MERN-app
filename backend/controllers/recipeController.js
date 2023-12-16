//This file contains functions that are fired as a responses for certain requests.
// They are exported to the file '../routes/recipe'.

const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')

// get all Recipes
const getRecipes = async (req, res) => {
  const user_id = req.user._id
  const recipes = await Recipe.find({user_id}).sort({createdAt: -1})

  res.status(200).json(recipes)
}

// get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params

  //A validation check to ensure that the id parameter passed
  // to the route corresponds to a valid MongoDB ObjectId. 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Recipe'})
  }

  const recipe = await Recipe.findById(id)

  if (!recipe) {
    return res.status(404).json({error: 'No such Recipe'})
  }

  res.status(200).json(recipe)
}

// create a new recipe
const createRecipe = async (req, res) => {
  const {title, category, cookingTime, ingredients, instructions, imageUrl} = req.body
  
 //handle empty fields error
 let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!ingredients) {
    emptyFields.push('ingredients')
  }
  if (!instructions) {
    emptyFields.push('instructions')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  //add to the database
  try {
    const user_id = req.user._id
    const recipe = await Recipe.create({ title, category, cookingTime, ingredients, instructions, imageUrl, user_id })
    res.status(200).json(recipe)
  } catch (error) {
    res.status(403).json({ error: error.message })
  }
}

// delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Recipe'})
  }

  const recipe = await Recipe.findOneAndDelete({_id: id})
  console.log(recipe)

  if(!recipe) {
    return res.status(400).json({error: 'No such Recipe'})
  }

  res.status(200).json(recipe)
}

// update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Recipe'})
  }

  //handle empty fields error
 let emptyFields = []

 if (!req.body.title) {
   emptyFields.push('title')
 }
 if (!req.body.ingredients) {
   emptyFields.push('ingredients')
 }
 if (!req.body.instructions) {
   emptyFields.push('instructions')
 }
 if (emptyFields.length > 0) {
   return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
 }

  const recipe = await Recipe.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!recipe) {
    return res.status(400).json({error: 'No such Recipe'})
  }

  res.status(200).json(recipe)
}

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe
}

