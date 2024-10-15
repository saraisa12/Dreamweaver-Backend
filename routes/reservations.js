const express = require("express")

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

//import controller
const reservationsCntrl = require("../controllers/reservations")

//routes
router.post("/add", reservationsCntrl.reservations_create_post)

module.exports = router
