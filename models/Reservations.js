// models/reservationModel.js
const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
)

const Reservation = mongoose.model("Reservation", reservationSchema)

module.exports = Reservation
