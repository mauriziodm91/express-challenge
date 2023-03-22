const { body } = require('express-validator')

const validators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional(),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
]

module.exports = validators
