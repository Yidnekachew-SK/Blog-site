const { Router } = require('express');
const authController = require('../controller/authController');
const passport = require("passport");

const authRouter = Router();

authRouter.get('/login', authController.loginGet);

authRouter.post('/login', 
    passport.authenticate('local', { session: false }), 
    authController.loginPost
);

authRouter.get('/signup', authController.signup);

authRouter.post('/signup', authController.signupPost);

module.exports = authRouter