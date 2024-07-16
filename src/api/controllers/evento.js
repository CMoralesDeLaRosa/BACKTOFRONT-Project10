const mongoose = require('mongoose')
const Attendee = require('../models/asistente')
const Event = require('../models/evento')
const User = require('../models/usuario')

const getEvents = async (req, res, next) => {
  try {
    const allEvents = await Event.find({ verified: true })
    return res.status(200).json(allEvents)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getEventsNotVerified = async (req, res, next) => {
  try {
    const allEvents = await Event.find({ verified: false })
    return res.status(200).json(allEvents)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.find(id)
    return res.status(200).json(event)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const postEvent = async (req, res, next) => {
  try {
    const newEvent = new Event(req.body)

    if (req.file) {
      newEvent.img = req.file.path
    }
    /*if (req.user.rol === 'admin') {
      newEvent.verified = true
    } else {
      newEvent.verified = false
    }*/

    const eventSaved = await newEvent.save()
    return res.status(201).json(eventSaved)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getAttendeesUsersByEvent = async (req, res, next) => {
  try {
    const { id } = req.params

    const attendees = await Attendee.find({ events: id })
    const users = await User.find({ events: id })
    const combinedResults = [...attendees, ...users]

    if (combinedResults.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron asistentes ni usuarios para este evento'
      })
    }

    return res.status(200).json(combinedResults)
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener asistentes y usuarios',
      error: error.message
    })
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params

    const eventDeleted = await Event.findByIdAndDelete(id)
    if (eventDeleted && eventDeleted.img) {
      deleteFile(userDeleted.img)
    }

    return res.status(200).json(eventDeleted)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const validateEvent = async (req, res, next) => {
  try {
    const { id } = req.params

    const eventValidated = await Event.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true, runValidators: true }
    )

    if (!eventValidated) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }

    return res.status(200).json(eventValidated)
  } catch (error) {
    console.error('Error al validar el evento:', error)
    return res.status(400).json({ message: 'Error del servidor' })
  }
}

module.exports = {
  getEvents,
  getEventById,
  postEvent,
  deleteEvent,
  getEventsNotVerified,
  getAttendeesUsersByEvent,
  validateEvent
}
