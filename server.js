const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")

// Load environment variables from .env file
require("dotenv").config()

// Load DB
require("./config/db")

// PORT Configurations
const PORT = process.env.PORT || 4000

const app = express()

// Enable CORS for all routes
app.use(cors())
// Middleware to parse JSON and URL-encoded data
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Import routes
const eventRouter = require("./routes/event")
const authRouter = require("./routes/AuthRouter") // Import your AuthRouter
const reservationsRouter = require("./routes/reservations")

//mount routes
app.use("/uploads", express.static("uploads"))
app.use("/event", eventRouter)
app.use("/reservations", reservationsRouter)
app.use("/auth", authRouter) // Mount the AuthRouter for authentication

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
