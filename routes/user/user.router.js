const express = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userRouter = express.Router()

//THIS WHOLE ENDPOINT IS FOR DEMONSTRATION PURPOSES
userRouter.post(
  '/login',
  body('username').notEmpty().withMessage('Please enter a username'),
  (req, res) => {
    //IMPORTANT: NO DATA SHOULD BE HARDCODED THIS IS MADE JUST FOR DEMONSTRATION PURPOSES
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() })
    }
    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1800s',
    })

    res.json({ accessToken: accessToken })
  }
)

module.exports = userRouter
