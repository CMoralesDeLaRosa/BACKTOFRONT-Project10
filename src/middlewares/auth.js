const Attendee = require('../api/models/asistente')
const User = require('../api/models/usuario')
const { verifySign } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json('No estás autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifySign(parsedToken)

    const user = await User.findById(id)
    const attendee = await Attendee.findById(id)

    if (user) {
      user.password = null
      req.user = user
      next()
    } else if (attendee) {
      attendee.password = null
      req.attendee = attendee
      next()
    } else {
      return res.status(401).json('No estás autorizado')
    }
  } catch (error) {
    console.error('Error en isAuth middleware:', error)
    return res.status(401).json('No estás autorizado')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('No estás autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifySign(parsedToken)

    const user = await User.findById(id)

    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('Para realizar esta acción necesitas ser administrador')
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
}

module.exports = { isAuth, isAdmin }
