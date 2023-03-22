const express = require('express')
const tasksRouter = express.Router()
const {
  httpGetAllTasks,
  httpAddNewTask,
  httpGetTaskById,
  httpUpdateTask,
} = require('./tasks.controller')
const validators = require('../../services/utils') //Array of body validators

tasksRouter.get('/', httpGetAllTasks)
tasksRouter.get('/:id', httpGetTaskById)
tasksRouter.post('/', validators, httpAddNewTask)
tasksRouter.put('/:id', validators, httpUpdateTask)

module.exports = tasksRouter
