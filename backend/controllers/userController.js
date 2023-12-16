//This file contains functions that are fired as a responses for certain requests.
// They are exported to the file '../routes/user'.

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//A function to create a JWT token with a given user id
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    //runs a static login function defined in 'userModel' file
    //if successful, the specific user document from database is returned
    const user = await User.login(email, password)

    // token is created for this specific user
    const token = createToken(user._id)
    
    //the token is returned as a json response to enable access to website functionality
    //the email is returned as a json response to be shown in the navbar
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    //runs a static signup function defined in 'userModel' file
    //if successful, the specific user document from database is returned
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }