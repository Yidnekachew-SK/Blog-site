const jwt = require('jsonwebtoken');
const { body, validationResult, matchedData } = require('express-validator');
const bcrypt = require("bcryptjs");
const authService = require('../services/authService');

async function login(req, res, next, user) {
    try {
        const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.SECRET,
        { expiresIn: "1h" }
        );
        res.json({ token, user: {
            id: user.id,
            username: user.username
        }});
    } catch (err) {
        next(err);
    }
}

const validateUserSignup = [
    body('fullname').trim()
        .isAlpha().withMessage('Name should only be letters'),
    body('username').trim()
        .isAlphanumeric().withMessage('Username should only be letters and numbers'),
    body('password').trim()
        .matches(/^[a-zA-Z0-9_,!#\-]+$/).withMessage('Invalid character used')
        .isLength({min: 8}).withMessage('Password must be atleast 8 characters long')
]

const signup = [
    validateUserSignup,
    async (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            res.status(400).json({errors: error.array()})
        }
        const { fullname, username, password } = matchedData(req);
        const hashedPassword = bcrypt.hash(password, 10);
        const newUser = await authService.createUser(fullname, username, hashedPassword);

        const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.SECRET,
        { expiresIn: "1h" }
        );
        res.json({ token, user: {
            id: user.id,
            username: user.username
        }});
    }
]

module.exports = {
    login,
    signup
}