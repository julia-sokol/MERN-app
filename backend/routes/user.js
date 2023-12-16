//The file serves as a mapping of request URLs to the specific functions which handle the request 
//and are stored in the userController file.

const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router