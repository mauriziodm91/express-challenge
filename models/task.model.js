const Tasks = require('./taskSchema.mongo')

async function getAllTasks() {
  return await Tasks.find({}, { __v: 0 })
}

async function addNewTask(name, description, completed) {
  const task = new Tasks({ name, description, completed })
  return await task.save()
}

async function getTaskByID(id) {
  return await Tasks.findById(id)
}

module.exports = {
  getAllTasks,
  addNewTask,
  getTaskByID,
}
