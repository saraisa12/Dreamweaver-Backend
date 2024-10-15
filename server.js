const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

// Load environment variables from .env file
require('dotenv').config()

//Load DB
require('./config/db')

// PORT Configurations
const PORT = process.env.PORT || 4000

const app = express()

//enable cors for all routes
app.use(cors())
// Middleware to parse JSON and URL-encoded data
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//import routes

const eventRouter = require('./routes/event')

//mount routes

app.use('/event', eventRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
