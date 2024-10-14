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
