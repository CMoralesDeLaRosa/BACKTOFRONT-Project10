const express = require('express')
const {
  register,
  login,
  deleteUser,
  getUsers,
  updateUser,
  getUserById,
  addEvent,
  deleteUserAdmin,
  deleteEventUser
} = require('../controllers/usuario')

const { isAuth, isAdmin } = require('../../middlewares/auth')
const { upload } = require('../../middlewares/file')

const userRouter = express.Router()

userRouter.get('/', isAdmin, getUsers)
userRouter.get('/:id', getUserById)
userRouter.post('/register', upload('users').single('img'), register)
userRouter.post('/login', login)
userRouter.put('/add-event/:id', isAuth, addEvent)
userRouter.put('/update/:id', isAuth, upload('users').single('img'), updateUser)
userRouter.delete('/admin/:id', isAdmin, deleteUserAdmin)
userRouter.delete('/:id', isAuth, deleteUser)
userRouter.delete('/:id/delete/:eventId', isAuth, deleteEventUser)
module.exports = userRouter
