const express = require('express')
const {
  getEvents,
  getEventById,
  postEvent,
  deleteEvent,
  getEventsNotVerified,
  getAttendeesUsersByEvent,
  validateEvent
} = require('../controllers/evento')
const { isAdmin, isAuth } = require('../../middlewares/auth')
const { upload } = require('../../middlewares/file')

const eventRouter = express.Router()

eventRouter.get('/not-verified', isAdmin, getEventsNotVerified)
eventRouter.get('/attendees/:id', isAuth, getAttendeesUsersByEvent)
eventRouter.get('/:id', isAuth, getEventById)
eventRouter.get('/', getEvents)
eventRouter.put('/:id', isAdmin, validateEvent)
eventRouter.post('/', isAuth, upload('events').single('img'), postEvent)
eventRouter.delete('/:id', isAdmin, deleteEvent)

module.exports = eventRouter
