const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const attendeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: [{ type: mongoose.Types.ObjectId, required: false, ref: 'events' }]
  },
  { timestamps: true, collection: 'attendees' }
)

attendeeSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const Attendee = mongoose.model('attendees', attendeeSchema, 'attendees')

module.exports = Attendee
