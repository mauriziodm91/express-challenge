const {
  getAllTasks,
  addNewTask,
  getTaskByID,
} = require('../../models/task.model')
const { validationResult } = require('express-validator')
const { default: mongoose } = require('mongoose')

//Callback function for GET method
async function httpGetAllTasks(req, res) {
  res.status(200).json(await getAllTasks())
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
    res.status(200).json(task)
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

module.exports = {
  httpGetAllTasks,
  httpAddNewTask,
  httpGetTaskById,
}
