const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const { generateSign } = require('../../config/jwt')
const User = require('../models/usuario')
const { deleteFile } = require('../../utils/deleteFile')
const Event = require('../models/evento')

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      img: req.body.img,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: 'user'
    })

    const userDuplicatedbyName = await User.findOne({
      name: req.body.name
    })

    if (userDuplicatedbyName) {
      return res.status(400).json({ error: 'Ese nombre de usuario ya existe' })
    }

    const userDuplicatedbyEmail = await User.findOne({
      email: req.body.email
    })

    if (userDuplicatedbyEmail) {
      return res.status(400).json({ error: 'Ese email ya existe' })
    }

    if (req.file) {
      newUser.img = req.file.path
    }
    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)
        return res.status(200).json({ user, token })
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

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userIdFromAuth } = req.user

    if (id !== userIdFromAuth) {
      return res
        .status(403)
        .json('No estás autorizado para realizar esta acción')
    }

    const updateData = { ...req.body }

    if (req.file) {
      updateData.img = req.file.path
      const oldUser = await User.findById(id)
      if (oldUser.img) {
        deleteFile(oldUser.img)
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error')
  }
}

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!req.user) {
      return res.status(400).json('No estás autenticado')
    }

    const userIdFromAuth = req.user.id

    if (id !== userIdFromAuth) {
      return res
        .status(403)
        .json('No estás autorizado para realizar esta acción')
    }

    const userDeleted = await User.findByIdAndDelete(id)
    if (userDeleted && userDeleted.img) {
      deleteFile(userDeleted.img)
    }

    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params

    const userDeleted = await User.findByIdAndDelete(id)
    if (userDeleted && userDeleted.img) {
      deleteFile(userDeleted.img)
    }

    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const addEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { events } = req.body

    const userId = new mongoose.Types.ObjectId(id)
    const eventObjectId = new mongoose.Types.ObjectId(events)

    const event = await Event.findById(eventObjectId)
    if (!event) {
      return res.status(404).json('Evento no encontrado')
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { events: eventObjectId } },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const { id, eventId } = req.params

    const userId = new mongoose.Types.ObjectId(id)
    const eventObjectId = new mongoose.Types.ObjectId(eventId)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { events: eventObjectId } },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error')
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findById(id).populate('events')

    if (!user) {
      return res.status(404).json('Asistente no encontrado')
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error')
  }
}

module.exports = {
  login,
  register,
  deleteUser,
  getUsers,
  updateUser,
  addEvent,
  deleteEvent,
  getUserById,
  deleteUserAdmin
}
