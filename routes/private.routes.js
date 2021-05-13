const express = require('express');
const router  = express.Router();
const Promoter = require('../models/Promoter.model');
const Venue = require('../models/Venue.model');
const Booking = require ('../models/Booking.model');

function DDMMYYYY(date) {
  const d = new Date(date);
  return `${date.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}


router.get('/profile-promoter', isLoggedIn, (req, res) => {
  Promoter.findById({_id: req.user.id})
  .then(user => {
    res.status(200).json(user)
  })
});

router.get('/profile-venue', isLoggedIn, (req, res) => {
  Venue.findById({_id: req.user.id})
  .then(user => {
    res.status(200).json(user)
  })
});


router.put('/edit-promoter', (req, res, next) => {
  Promoter.findOneAndUpdate({ _id: req.user.id }, { ...req.body}, { new: true })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(500).json(error))
})

router.put('/edit-venue', (req, res, next) => {
  Venue.findOneAndUpdate({ _id: req.user.id }, { ...req.body}, { new: true })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(500).json(error))
})


module.exports = router;