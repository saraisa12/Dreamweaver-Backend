const User = require('../models/User') // Correctly import the User model
const middleware = require('../middleware') // This should point to the index.js in middleware

// Register a new user
const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    let passwordDigest = await middleware.hashPassword(password)

    // Check if user already exists
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    }

    // Create new user
    const user = await User.create({ name, email, passwordDigest })
    res.status(201).send(user) // Respond with created status
  } catch (error) {
    console.error('Registration error:', error) // Log the error for debugging
    res.status(500).send({ status: 'Error', msg: 'Server error occurred!' })
  }
}

// Login user
const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).send({ status: 'Error', msg: 'User not found!' })
    }

    // Compare password
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )

    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }

    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log('Login error:', error) // Log the error for debugging
    res.status(500).send({ status: 'Error', msg: 'Server error!' })
  }
}

// Update user password
const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.user_id)

    if (!user) {
      return res.status(404).send({ status: 'Error', msg: 'User not found!' })
    }

    // Check if old password matches
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )

    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(
        req.params.user_id,
        { passwordDigest },
        { new: true }
      )

      let payload = {
        id: user.id,
        email: user.email
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }

    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log('Update password error:', error) // Log the error for debugging
    res
      .status(500)
      .send({
        status: 'Error',
        msg: 'An error has occurred updating password!'
      })
  }
}

// Check user session
const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession
}
