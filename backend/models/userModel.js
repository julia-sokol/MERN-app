// a database schema for the collection that stores user login details

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  //checks whether a valid email is entered
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  //checks whether a password is strong enough
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  //checks whether a user with the entered email already exists
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  //the password provided by a user is getting hashed
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  //'this' refers to the db collection with the data schema defined in this file
  // a document is saved to the collection, the hashed version of a password is saved
  const user = await this.create({ email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  //checks whether all the fields are filled
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  //searches for a registered user with the provided email
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  //validates the supplied user password
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)