const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: [{ type: mongoose.Types.ObjectId, required: false, ref: 'events' }],
    rol: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user'
    }
  },
  { timestamps: true, collection: 'usuarios' }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = User
