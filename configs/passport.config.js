const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Venue = require('../models/Venue.model');
const Promoter = require('../models/Promoter.model');

module.exports = (app) =>{
  passport.serializeUser((user, cb) => { cb(null, user.id )});

  passport.deserializeUser((id, cb) => {
    Promoter.findById(id)
    .then(user => cb(null, user))
    .catch(error => cb(error))
  }); 

  passport.deserializeUser((id, cb) => {
    Venue.findById(id)
    .then(user => cb(null, user))
    .catch(error => cb(error))
  }); 

   // Local Strategy 

   passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'email'}, (req, email, password, next) => {
    Promoter.findOne({ email })
    .then(promoter => {
      if(!promoter){
        Venue.findOne({ email })
        .then(venue =>{
          if(!venue){
            return next(null, false, { message: 'Incorrect user or password'});
          }
        })        
      }

      if(bcrypt.compareSync(password, user.password)){
        return next(null, user);
      } else {
        return next(null, false, { message: 'Incorrect user or password'});
      }
    }) 
    .catch((error) => next(error))
  }))  

  app.use(passport.initialize());
  app.use(passport.session());
}