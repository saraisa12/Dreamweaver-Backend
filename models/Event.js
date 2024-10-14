const mongoose = require("mongoose")

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    availableTickets: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model("Event", eventSchema)

module.exports = { Event }
