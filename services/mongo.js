const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL =
  process.env.MONGO_URL ||
  'mongodb+srv://mauriziodm91:fS2kEKMcO9RDATUX@tasks.cwno0ho.mongodb.net/?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
  console.log('Mongodb Connection Success')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function mongoConnect() {
  await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}
