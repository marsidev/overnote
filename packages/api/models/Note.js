const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  title: String,
  content: String,
  pinned: Boolean,
  createdBy: {
    type: String,
    ref: 'User'
  },
  backgroundColor: String,
  _id: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: {
    transform: (obj, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

noteSchema.virtual('user', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: 'id',
  justOne: true
})

const Note = model('Note', noteSchema)

module.exports = Note
