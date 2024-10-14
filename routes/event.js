const express = require("express")

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

//import controller
const eventCntrl = require("../controllers/event")

//routes
router.post("/add", eventCntrl.event_create_post)

module.exports = router
