const express = require('express')
const api = express.Router()
const tasksRouter = require('./tasks/tasks.router')

api.use('/tasks', tasksRouter)

module.exports = api
