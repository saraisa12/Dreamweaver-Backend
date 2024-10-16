const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // Added role field
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
