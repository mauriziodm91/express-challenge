const express = require('express')
const tasksRouter = express.Router()
const {
  httpGetAllTasks,
  httpAddNewTask,
  httpGetTaskById,
  httpUpdateTask,
  httpDeleteTask,
} = require('./tasks.controller')
const validators = require('../../services/utils') //Array of body validators

tasksRouter.get('/', httpGetAllTasks)
tasksRouter.get('/:id', httpGetTaskById)
tasksRouter.post('/', validators, httpAddNewTask)
tasksRouter.put('/:id', validators, httpUpdateTask)
tasksRouter.delete('/:id', httpDeleteTask)

module.exports = tasksRouter
