const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: String,
    ref: 'Note'
  }],
  avatar: String
}, {
  timestamps: true,
  toJSON: {
    transform: (obj, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      delete ret.passwordHash
    }
  }
})

const User = model('User', userSchema)

module.exports = User
