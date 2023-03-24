const { body } = require('express-validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validators = [
  body('name')
    .notEmpty()
    .isString()
    .withMessage('Name is required and must be a string'),
  body('description').optional(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
]

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null)
    return res.status(401).json({ message: 'Forbidden Access' })
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' })
    req.user = user
    next()
  })
}

module.exports = { validators, authenticateToken }
