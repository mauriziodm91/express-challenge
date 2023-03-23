const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userRouter = express.Router()

userRouter.post('/login', (req, res) => {
  //IMPORTANT: NO DATA SHOULD BE HARDCODED THIS IS MADE JUST FOR DEMONSTRATION PURPOSES
  const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '1800s',
  })

  res.json({ accessToken: accessToken })
})

module.exports = userRouter
