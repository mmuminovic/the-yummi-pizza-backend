const { validationResult } = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Login
exports.login = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.')
        error.data = errors.array()
        return res.status(402).json({ message: error.data[0].msg })
    }
    const { email, password } = req.body
    let loadedUser
    User.findOne({ where: { email: email } })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials',
                })
            }
            loadedUser = user
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        message: 'Invalid credentials',
                    })
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: loadedUser.email,
                            userId: loadedUser.id.toString(),
                            name: loadedUser.name,
                        },
                        process.env.JWT_KEY,
                        { expiresIn: '365d' }
                    )
                    return res.status(200).json({
                        success: 'Auth successful',
                        token: token,
                        userId: loadedUser.id.toString(),
                    })
                } else {
                    return res.status(400).json({
                        message: 'Invalid credentials',
                    })
                }
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Something is wrong.',
            })
        })
}

// Signup
exports.signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.')
        error.statusCode = 422
        error.data = errors.array()
        return res.json({ error: error.data[0].msg })
    }
    const { email, name, password } = req.body
    bcrypt
        .hash(password, 12)
        .then((hashedPw) => {
            const user = {
                email,
                password: hashedPw,
                name,
            }
            return User.create(user)
        })
        .then((result) => {
            if (result) {
                res.status(201).json({
                    message: 'User created!',
                    userId: result.id,
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong.',
                })
            }
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
