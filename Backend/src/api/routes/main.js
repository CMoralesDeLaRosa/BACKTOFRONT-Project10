const express = require('express')
const userRouter = require('./usuario')
const eventRouter = require('./evento')
const attendeeRouter = require('./asistente')

const mainRouter = express.Router()

mainRouter.use('/users', userRouter)
mainRouter.use('/events', eventRouter)
mainRouter.use('/attendees', attendeeRouter)

module.exports = mainRouter
