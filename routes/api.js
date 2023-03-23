const express = require('express')
const api = express.Router()
const tasksRouter = require('./tasks/tasks.router')
const userRouter = require('./user/user.router')

api.use('/tasks', tasksRouter)
api.use('/user', userRouter)

module.exports = api
