const express = require('express')
const { body } = require('express-validator')
const { login, signup } = require('../controllers/user')

const router = express.Router()

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email address')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password has at least 6 characters')
            .isAlphanumeric()
            .trim(),
    ],
    login
)
router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email address')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password has at least 6 characters')
            .isAlphanumeric()
            .trim(),
        body('name')
            .isString()
            .notEmpty()
            .withMessage('Enter your name')
    ],
    signup
)

module.exports = router
