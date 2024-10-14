const mongoose = require("mongoose")
const express = require("express")

// Load environment variables from .env file
require("dotenv").config()

//Load DB
require("./config/db")

// PORT Configurations
const PORT = process.env.PORT

const app = express()

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
