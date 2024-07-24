const express = require('express')
const {
  registerAttendee,
  loginAttendee,
  addEvent,
  getAttendeeById,
  deleteEvent,
  deleteAttendee,
  updateAttendee,
  getAttendees,
  deleteAttendeeAdmin
} = require('../controllers/asistente')
const { isAuth, isAdmin } = require('../../middlewares/auth')

const attendeeRouter = express.Router()

attendeeRouter.post('/register', registerAttendee)
attendeeRouter.post('/login', loginAttendee)

attendeeRouter.use(isAuth)
attendeeRouter.get('/:id', getAttendeeById)
attendeeRouter.get('/', getAttendees)
attendeeRouter.put('/update/:id', updateAttendee)
attendeeRouter.put('/add-event/:id', addEvent)
attendeeRouter.delete('/admin/:id', isAdmin, deleteAttendeeAdmin)
attendeeRouter.delete('/:id/delete/:eventId', deleteEvent)
attendeeRouter.delete('/:id', isAuth, deleteAttendee)

module.exports = attendeeRouter
