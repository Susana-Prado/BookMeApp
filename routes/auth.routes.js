const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.model');
const Promoter = require('../models/Promoter.model')
const Venue = require('../models/Venue.model')

// Bcrypt config to encrypt passwords
const bcrypt = require('bcryptjs');
const uploader = require('../configs/cloudinary.config');
const bcryptSalt = 10;

//Signup promoter
router.post('/signup-promoter',   (req, res, next) => {
  console.log('probando ruta /signup-promoter')
  const { 
    username, 
    email, 
    password,
    address,
    contactInfo,
    CIF 
  } = req.body;

  
  // const image = req.file.path; 
  const image = undefined; 

  if(password.length < 3){
    return res.status(400).json({ message: 'Please make your password at least 3 characters long'});
  }

  if(!username || !email){
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
      username, 
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


//Signup venue
router.post('/signup-venue', (req, res, next) => {
  const { 
    username, 
    email,
    website,
    location,
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
    confirmed 
  } = req.body;

  //TODO:FIXME:TODO:FIXME:
  const image = undefined
  // const image = req.file.path;  

  if(password.length < 3){
    return res.status(400).json({ message: 'Please make your password at least 3 characters long'});
  }

  if(!username || !email){
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
      username, 
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

//login promoter
router.post('/login-promoter', (req, res, next) =>{
  passport.authenticate('local', (error, theUser, failureDetails) => {
    if(error){
      return res.status(500).json(error);
    }

    if(!theUser){
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (error) => {
      if(error){
        return res.status(500).json(error);
      }

      return res.status(200).json(theUser);
    })

  })(req, res, next)
})

//login venue
router.post('/login-venue', (req, res, next) =>{
  passport.authenticate('local', (error, theUser, failureDetails) => {
    if(error){
      return res.status(500).json(error);
    }

    if(!theUser){
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (error) => {
      if(error){
        return res.status(500).json(error);
      }

      return res.status(200).json(theUser);
    })

  })(req, res, next)
})

router.post('/logout', (req, res, next) => {
  // req.logout is defined by passport
  req.logout();
  return res.status(200).json({ message: 'Log out success!'});
})

router.put('/edit', uploader.single('photo'), (req, res, next) => {
  console.log(req.file);
  User.findOneAndUpdate({ _id: req.user.id }, { ...req.body, photo: req.file ? req.file.path : req.user.photo }, { new: true })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(500).json(error))
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