const express = require("express")

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

//import controller
const eventCntrl = require("../controllers/event")

//routes
router.post("/add", eventCntrl.event_create_post)
router.get("/index", eventCntrl.event_index_get)
router.delete("/delete/:id", eventCntrl.event_delete_delete)
router.get("/details/:id", eventCntrl.event_details_get)

module.exports = router
