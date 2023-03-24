const {
  getAllTasks,
  addNewTask,
  getTaskByID,
  updateExistingTask,
  removeTask,
} = require('../../models/task.model')
const { validationResult } = require('express-validator')
const { default: mongoose } = require('mongoose')

async function httpGetAllTasks(req, res) {
  try {
    const tasks = await getAllTasks()
    if (tasks.length === 0) {
      res.status(404).json({ message: 'There are no tasks' })
    } else {
      res.status(200).json(tasks)
    }
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

//Callback function for POST method
async function httpAddNewTask(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, description, completed } = req.body

  try {
    const task = await addNewTask(name, description, completed)
    res.status(201).json(task)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
}

async function httpGetTaskById(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid task ID' })
  }

  try {
    const task = await getTaskByID(id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json(task)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
}

async function httpUpdateTask(req, res) {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() })
  }

  const { id } = req.params
  try {
    const task = await updateExistingTask(id, req.body)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json(task)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
}

async function httpDeleteTask(req, res) {
  const { id } = req.params
  try {
    const task = await getTaskByID(id)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    await removeTask(task)
    res.json({ message: 'Task was removed' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  httpGetAllTasks,
  httpAddNewTask,
  httpGetTaskById,
  httpUpdateTask,
  httpDeleteTask,
}
