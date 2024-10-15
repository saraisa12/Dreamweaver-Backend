const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

// Import controller
const eventCntrl = require('../controllers/event')

// Routes
router.post('/add', eventCntrl.event_create_post)
router.get('/index', eventCntrl.event_index_get)
router.delete('/delete/:id', eventCntrl.event_delete_delete)
router.get('/details/:id', eventCntrl.event_details_get)

// Root route (to avoid 404 for root)
router.get('/', (req, res) => {
  res.send('Welcome to the Event API')
})

module.exports = router
