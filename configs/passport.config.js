const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Venue = require('../models/Venue.model');
const Promoter = require('../models/Promoter.model');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    Promoter.findById(id)
      .then((promoter) => {
        if (!promoter) {
          Venue.findById(id)
          .then((venue) => cb(null, venue))
          .catch((error) => cb(error))
        } else {
          cb(null, promoter);
        }
      })
      .catch((error) => cb(error));
  });


  // Local Strategy

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, next) => {
        try {
          const promoter = await Promoter.findOne({ email });
          if (!promoter) {
            const venue = await Venue.findOne({ email });
            if (!venue) {
              return next(null, false, {
                message: 'Incorrect user or password',
              });
            } else {
              if (bcrypt.compareSync(password, venue.password)) {
                return next(null, venue);
              } else {
                return next(null, false, {
                  message: 'Incorrect user or password',
                });
              }
            }
          } else {
            if (bcrypt.compareSync(password, promoter.password)) {
              return next(null, promoter);
            } else {
              return next(null, false, {
                message: 'Incorrect user or password',
              });
            }
          }
        } catch (error) {
          next(error);
        }
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
