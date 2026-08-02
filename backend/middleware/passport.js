const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

const authService = require('../services/authService');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log('LocalStrategy invoked with:', username, password);
    try {
        const user = await authService.getUserByUsername(username);
        console.log(await authService.getUserByUsername('yankee'));

        if (!user) {
            return done(null, false, { message: ["Incorrect username", ""] });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: ["", "Incorrect password"] })
        }

        return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await authService.getUserById(id);

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport