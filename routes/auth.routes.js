const express = require('express');
const passport = require('passport');
const router  = express.Router();
const Promoter = require('../models/Promoter.model');
const Venue = require('../models/Venue.model');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

router.post('/signup-promoter', (req, res, next) =>{
  const { 
    name, 
    email, 
    image,
    password,
    address,
    contactInfo,
    CIF 
  } = req.body;

  if(password.length < 3){
    return res.status(400).json({ message: 'Please make your password at least 3 characters long'});
  }

  if(!name || !email){
    return res.status(400).json({ message: 'Please fill all the fields in the form'});
  }

  Promoter.findOne({ email })
  .then(promoter => {
    if(promoter){
      return res.status(400).json({ message: 'User already exists. Please change your email'});
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    Promoter.create({
      name, 
      email, 
      address,
      contactInfo,
      password: hashPass,
      CIF,
      image
    })
    .then((newPromoter) => {
      // Passport req.login permite iniciar sesión tras crear el usuario
      req.login(newPromoter, (error) => {
        if(error){
          return res.status(500).json(error)
        }

        return res.status(200).json(newPromoter);
      })
    })
    .catch(error => res.status(500).json(error))
  })
})
 //TODO:FIXME:TODO:FIXME:
//  uploader.single('image')


router.post('/signup-venue', (req, res, next) => {
  const { 
    name, 
    email,
    website,
    location,
    address,
    image,
    contactInfo, 
    password,
    CIF,
    capacity,
    rentingPrice,
    rider,
    conditions,
    license,
    merch,
    security,
    ticketOffice,    
    production,
    technicians,
    genre,
    confirmed,
    date
  } = req.body;
  if(password.length < 3){
    return res.status(400).json({ message: 'Please make your password at least 3 characters long'});
  }

  if(!name || !email){
    return res.status(400).json({ message: 'Please fill all the fields in the form'});
  }

  Venue.findOne({ email })
  .then(venue => {
    if(venue){
      return res.status(400).json({ message: 'User already exists. Please change your email'});
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    Venue.create({
      name, 
      email, 
      website,
      location,
      contactInfo,      
      address,
      password: hashPass,
      CIF,
      capacity,
      rentingPrice,
      image,
      rider,
      conditions,
      license,
      merch,
      security,
      ticketOffice,
      production,
      technicians,
      genre,
      confirmed,
      date
    })
    .then((newVenue) => {
      // Passport req.login permite iniciar sesión tras crear el usuario
      req.login(newVenue, (error) => {
        if(error){
          return res.status(500).json(error)
        }

        return res.status(200).json(newVenue);
      })
    })
    .catch(error => res.status(500).json(error))
  })
})


router.post('/login', (req, res, next) =>{
  passport.authenticate('local', (error, theUser, failureDetails) => {
    if(error){
      return res.status(500).json(error);
    }

    if(!theUser){
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (error) => {
      console.log(theUser)
      if(error){
        return res.status(500).json(error);
      }

      return res.status(200).json(theUser);
    })

  })(req, res, next)
})


router.post('/logout', (req, res, next) => {
  req.logout();
  return res.status(200).json({ message: 'Log out success!'});
})


router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated & req.user are defined by passport
  if(req.isAuthenticated()){
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({ message: 'Forbbiden' });
  }
})


module.exports = router;
