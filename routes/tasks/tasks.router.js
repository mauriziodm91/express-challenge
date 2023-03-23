const express = require('express')
const tasksRouter = express.Router()
const {
  httpGetAllTasks,
  httpAddNewTask,
  httpGetTaskById,
  httpUpdateTask,
  httpDeleteTask,
} = require('./tasks.controller')
const { validators, authenticateToken } = require('../../services/middlewares') //Middlewares

tasksRouter.get('/', authenticateToken, httpGetAllTasks)
tasksRouter.get('/:id', authenticateToken, httpGetTaskById)
tasksRouter.post('/', authenticateToken, validators, httpAddNewTask)
tasksRouter.put('/:id', authenticateToken, validators, httpUpdateTask)
tasksRouter.delete('/:id', authenticateToken, httpDeleteTask)

module.exports = tasksRouter
