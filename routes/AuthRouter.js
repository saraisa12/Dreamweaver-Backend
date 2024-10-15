const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware') // Ensure this points to the index.js or the correct middleware file

// Define routes
router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.put(
  '/update-password/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
