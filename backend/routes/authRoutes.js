const { Router } = require('express');
const authController = require('../controller/authController');
const passport = require("passport");
require('../middleware/passport');
const passport_jwt = require('../middleware/passport-jwt');

const authRouter = Router();

authRouter.get("/me", passport_jwt.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: {
    id: req.user.id,
    username: req.user.username,
    role: req.user.role
  } });
});

authRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);

        if (!user) {
        return res.status(401).json({ error: info.message });
        }

        return authController.login(req, res, next, user);
    })(req, res, next)
});

authRouter.post('/signup', authController.signup);

module.exports = authRouter