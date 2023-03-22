const Tasks = require('./taskSchema.mongo')

async function getAllTasks() {
  return await Tasks.find({}, { __v: 0 })
}

async function addNewTask(name, description, completed) {
  const task = new Tasks({ name, description, completed })
  return await task.save()
}

async function getTaskByID(id) {
  return await Tasks.findById(id, { __v: 0 })
}

async function updateExistingTask(id, data) {
  const { name, description, completed } = data
  return await Tasks.findByIdAndUpdate(
    id,
    { name, description, completed },
    { new: true }
  ).select('-__v')
}

module.exports = {
  getAllTasks,
  addNewTask,
  getTaskByID,
  updateExistingTask,
}
