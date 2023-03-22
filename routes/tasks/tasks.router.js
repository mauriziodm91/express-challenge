const express = require('express')
const tasksRouter = express.Router()
const {
  httpGetAllTasks,
  httpAddNewTask,
  httpGetTaskById,
} = require('./tasks.controller')
const validators = require('../../services/utils') //Array of body validators

tasksRouter.get('/', httpGetAllTasks)
tasksRouter.get('/:id', httpGetTaskById)
tasksRouter.post('/', validators, httpAddNewTask)

module.exports = tasksRouter
