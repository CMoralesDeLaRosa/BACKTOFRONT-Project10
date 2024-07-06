const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, collection: 'events' }
)

const Event = mongoose.model('events', eventSchema, 'events')

module.exports = Event
