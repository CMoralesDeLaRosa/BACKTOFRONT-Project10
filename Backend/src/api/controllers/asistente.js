const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Attendee = require('../models/asistente')
const { generateSign } = require('../../config/jwt')
const Event = require('../models/evento')

const registerAttendee = async (req, res, next) => {
  try {
    const newAttendee = new Attendee({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    const attendeeDuplicatedbyName = await Attendee.findOne({
      name: req.body.name
    })

    if (attendeeDuplicatedbyName) {
      return res
        .status(400)
        .json({ error: 'Ese nombre de asistente ya existe' })
    }

    const attendeeDuplicatedbyEmail = await Attendee.findOne({
      email: req.body.email
    })

    if (attendeeDuplicatedbyEmail) {
      return res.status(400).json({ error: 'Ese email ya existe' })
    }

    const attendeeSaved = await newAttendee.save()
    return res.status(201).json(attendeeSaved)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const loginAttendee = async (req, res, next) => {
  try {
    const attendee = await Attendee.findOne({ email: req.body.email })
    if (attendee) {
      if (bcrypt.compareSync(req.body.password, attendee.password)) {
        const token = generateSign(attendee._id)
        return res.status(200).json({ attendee, token })
      } else {
        return res
          .status(400)
          .json('El usuario o la contraseña son incorrectos')
      }
    } else {
      return res.status(400).json('El usuario o la contraseña son incorrectos')
    }
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getAttendees = async (req, res, next) => {
  try {
    const allAttendees = await Attendee.find()
    return res.status(200).json(allAttendees)
  } catch (error) {
    return res.status(400).json('Error')
  }
}
const getAttendeeById = async (req, res, next) => {
  try {
    const { id } = req.params

    const attendee = await Attendee.findById(id).populate('events')

    if (!attendee) {
      return res.status(404).json('Asistente no encontrado')
    }

    return res.status(200).json(attendee)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error')
  }
}

const addEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { events } = req.body

    const attendeeId = new mongoose.Types.ObjectId(id)
    const eventObjectId = new mongoose.Types.ObjectId(events)

    const event = await Event.findById(eventObjectId)
    if (!event) {
      return res.status(404).json('Evento no encontrado')
    }

    const updatedAttendee = await Attendee.findByIdAndUpdate(
      attendeeId,
      { $addToSet: { events: eventObjectId } },
      { new: true, runValidators: true }
    )

    if (!updatedAttendee) {
      return res.status(404).json('Asistente no encontrado')
    }

    return res.status(200).json(updatedAttendee)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const { id, eventId } = req.params

    const attendeeId = new mongoose.Types.ObjectId(id)
    const eventObjectId = new mongoose.Types.ObjectId(eventId)

    const updatedAttendee = await Attendee.findByIdAndUpdate(
      attendeeId,
      { $pull: { events: eventObjectId } },
      { new: true, runValidators: true }
    )

    if (!updatedAttendee) {
      return res.status(404).json('Asistente no encontrado')
    }

    return res.status(200).json(updatedAttendee)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error')
  }
}

const deleteAttendee = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!req.attendee) {
      return res.status(400).json({ error: 'No estás autenticado' })
    }

    const attIdFromAuth = req.attendee.id

    if (id !== attIdFromAuth) {
      return res
        .status(403)
        .json({ error: 'No estás autorizado para realizar esta acción' })
    }

    const attendeeDeleted = await Attendee.findByIdAndDelete(id)

    if (!attendeeDeleted) {
      return res.status(404).json({ error: 'Asistente no encontrado' })
    }

    return res.status(200).json(attendeeDeleted)
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error al eliminar el perfil', details: error.message })
  }
}
const deleteAttendeeAdmin = async (req, res, next) => {
  try {
    const { id } = req.params

    const attendeeDeleted = await Attendee.findByIdAndDelete(id)

    return res.status(200).json(attendeeDeleted)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateAttendee = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    if (updateData.name) {
      const existingName = await Attendee.findOne({
        name: updateData.name,
        _id: { $ne: id }
      })

      if (existingName) {
        return res.status(400).json({ message: 'duplicate key error name' })
      }
    }

    if (updateData.email) {
      const existingEmail = await Attendee.findOne({
        email: updateData.email,
        _id: { $ne: id }
      })

      if (existingEmail) {
        return res.status(400).json({ message: 'duplicate key error email' })
      }
    }

    const updatedAttendee = await Attendee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    if (!updatedAttendee) {
      return res.status(404).json({ message: 'Asistente no encontrado' })
    }

    return res.status(200).json(updatedAttendee)
  } catch (error) {
    console.error('Error al actualizar el asistente:', error)
    return res.status(400).json({ message: 'Error del servidor' })
  }
}

module.exports = {
  registerAttendee,
  loginAttendee,
  addEvent,
  getAttendeeById,
  deleteEvent,
  deleteAttendee,
  updateAttendee,
  getAttendees,
  deleteAttendeeAdmin
}
