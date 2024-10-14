const mongoose = require("mongoose")

const favoriteSchema = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
)

const Favorite = mongoose.model("Favorite", favoriteSchema)

module.exports = { Favorite }
