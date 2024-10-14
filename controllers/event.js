const Event = require("../models/Event")

exports.event_create_post = async (req, res) => {
  try {
    const event = new Event(req.body)
    console.log("Request Body:", req.body)

    await event.save()
    res.status(201).json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    res.status(400).json({ error: error.message })
  }
}

exports.event_index_get = async (req, res) => {
  try {
    const events = await Event.find()
    console.log("retrived Events :", events)
    res.status(200).json(events)
  } catch (error) {
    console.error("Error retrieving events:", error)
    res.status(500).json({ error: error.message })
  }
}

exports.event_delete_delete = async (req, res) => {
  try {
    const id = req.params.id
    const event = await Event.findByIdAndDelete(id)

    res.status(200).json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Error deleting event:", error)
    res.status(500).json({ error: error.message })
  }
}
