const Event = require('../models/Event')
const multer = require('multer')
const path = require('path')

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/') // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Unique filename
  }
})

// Initialize multer
upload = multer({ storage: storage })

// Get all events
const event_index_get = async (req, res) => {
  try {
    const events = await Event.find()
    console.log('Retrieved Events:', events)
    res.status(200).json(events)
  } catch (error) {
    console.error('Error retrieving events:', error)
    res.status(500).json({ error: error.message })
  }
}

// Create a new event
const event_create_post = async (req, res) => {
  try {
    const { name, date, time, details, availableTickets } = req.body
    const image = req.file ? req.file.filename : null // Get the filename if an image is uploaded

    const event = new Event({
      name,
      date,
      time,
      details,
      availableTickets,
      image
    })

    console.log('Request Body:', req.body)
    await event.save()
    res.status(201).json(event)
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(400).json({ error: error.message })
  }
}

// Get event details by ID
const event_details_get = async (req, res) => {
  try {
    const id = req.params.id
    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    console.log('Event Details:', event)
    res.status(200).json(event)
  } catch (error) {
    console.error('Error retrieving event:', error)
    res.status(500).json({ error: error.message })
  }
}

// Delete an event by ID
const event_delete_delete = async (req, res) => {
  try {
    const id = req.params.id
    const deletedEvent = await Event.findByIdAndDelete(id)

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.status(200).json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  event_index_get,
  event_create_post,
  event_details_get,
  event_delete_delete,
  upload
}
