//The file serves as a mapping of request URLs to the specific functions which handle the request 
//and are stored in the recipeController file.

const express = require('express')
const {
  getRecipes, 
  getRecipe, 
  createRecipe,
  deleteRecipe, 
  updateRecipe
} = require('../controllers/recipeController')

// Validates the authentication token and lets the code proceed with routing only
// if the token is valid
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require authentication for all recipe routes
router.use(requireAuth)

// GET all recipes
router.get('/', getRecipes)

// GET a single recipe
router.get('/:id', getRecipe)

// POST a new recipe
router.post('/', createRecipe)

// DELETE a recipe
router.delete('/:id', deleteRecipe)

// UPDATE a recipe
router.patch('/:id', updateRecipe)

module.exports = router