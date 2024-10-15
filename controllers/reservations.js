const Reservations = require("../models/Reservations")
const nodemailer = require("nodemailer")

exports.reservations_create_post = async (req, res) => {
  try {
    console.log("Request Body:", req.body)

    const reservation = new Reservations(req.body)
    await reservation.save()

    const transporter = nodemailer.createTransport({
      service: "Gmail", // e.g., Gmail
      auth: {
        user: "dreamweaver.thempark@gmail.com",
        pass: "ibak zclb lisy qscu",
      },
      debug: true,
    })

    const mailOptions = {
      from: "dreamweaver.thempark@gmail.com",
      to: reservation.email, // Use 'reservation' here
      subject: "Ticket Reservation Confirmation",
      text: `Hello ${reservation.name},\n\nThank you for reserving tickets for the event.\n\nEvent Details:\n- Quantity: ${reservation.quantity}\n\nWe look forward to seeing you!\n\nBest regards,\nDreamweaver team`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error)
        return res.status(500).json({ error: "Failed to send email." })
      } else {
        console.log("Email sent:", info.response)
        return res.status(201).json({
          message: "Reservation created and email sent.",
          reservation, // Return the reservation object in the response
        })
      }
    })
  } catch (error) {
    console.error("Error creating reservation:", error)
    res.status(400).json({ error: error.message })
  }
}
