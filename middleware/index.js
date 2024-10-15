const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10 // Default to 10 if not set
const APP_SECRET = process.env.APP_SECRET

// Function to hash passwords
const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}

// Function to compare passwords
const comparePassword = async (storedPassword, password) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword)
  return passwordMatch
}

// Function to create JWT tokens
const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

// Middleware to strip token from request headers
const stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1] // Optional chaining to avoid errors
    if (token) {
      res.locals.token = token // Store token for later use
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'Strip Token Error!' })
  }
}

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  const { token } = res.locals
  try {
    let payload = jwt.verify(token, APP_SECRET)
    if (payload) {
      res.locals.payload = payload // Pass the decoded payload to the next middleware
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'Verify Token Error!' })
  }
}

// Export middleware functions
module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken
}
