const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  cookingTime: {
    type: String,
    required: false
  },
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)