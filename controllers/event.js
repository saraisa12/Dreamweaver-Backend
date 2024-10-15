const Event = require("../models/Event")

exports.event_create_post = async (req, res) => {
  try {
    console.log("Uploaded file:", req.file)

    const { name, date, time, details, availableTickets } = req.body
    const image = req.file ? req.file.path : null

    console.log("Image path to be saved:", image)

    // Create a new event with the provided data
    const event = new Event({
      name,
      date,
      time,
      details,
      availableTickets,
      image, // Save the image path in the database
    })

    // Save the event to the database
    await event.save()

    res.status(201).json({ message: "Event created successfully", event })
  } catch (error) {
    console.error("Error creating event:", error)
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message })
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

exports.event_details_get = async (req, res) => {
  try {
    const id = req.params.id
    const event = await Event.findById(id)

    console.log(event)
    res.status(200).json(event)
  } catch (error) {
    console.error("Error retrieving event:", error)
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
