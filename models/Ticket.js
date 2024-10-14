const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema(
  {
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = { Ticket }
