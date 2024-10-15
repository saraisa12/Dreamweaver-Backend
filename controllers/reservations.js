const Reservations = require("../models/Reservations")

exports.reservations_create_post = async (req, res) => {
  try {
    console.log("Request Body:", req.body)

    const reservation = new Reservations(req.body)

    await reservation.save()

    res.status(201).json({
      message: "Reservation created successfully!",
      reservation,
    })
  } catch (error) {
    console.error("Error creating reservation:", error)
    res.status(400).json({ error: error.message })
  }
}
