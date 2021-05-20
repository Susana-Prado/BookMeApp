const express = require('express');
const router = express.Router();
const Promoter = require('../models/Promoter.model');
const Venue = require('../models/Venue.model');
const Booking = require('../models/Booking.model');
const uploader = require('../configs/cloudinary.config');
const passport = require('passport');
const { isLoggedIn } = require('../configs/middlewares/auth');

router.get('/profile-promoter', (req, res) => {
  Promoter.findById({ _id: req.user.id })
    .populate({
      path: 'bookings',
      populate: [{ path: 'venue' }, { path: 'promoter' }],
    })
    .then((user) => {
      res.status(200).json(user);
    });
});

router.get('/profile-venue', (req, res) => {
  Venue.findById({ _id: req.user.id })
    .populate({
      path: 'bookings',
      populate: [{ path: 'venue' }, { path: 'promoter' }],
    })
    .then((user) => {
      res.status(200).json(user);
    });
});

router.put('/edit-promoter', isLoggedIn, (req, res, next) => {
  Promoter.findOneAndUpdate(
    { _id: req.user.id },
    { ...req.body },
    { new: true }
  )
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
});

router.put('/edit-venue', uploader.single('image'),(req, res, next) => {
  console.log(req.body)
  console.log(req.file)
    Venue.findOneAndUpdate(
      { _id: req.user.id },
      { ...req.body, image: req.file ? req.file.path : req.user.image },
      { new: true }
    )
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(500).json(error));
  }
);

router.delete('/delete-promoter', isLoggedIn, (req, res, next) => {
  Promoter.findByIdAndRemove(req.user.id)
    .then(() => res.status(200).json({ message: 'User removed' }))
    .catch((error) => res.status(500).json(error));
});

router.delete('/delete-venue', isLoggedIn, (req, res, next) => {
  Venue.findByIdAndRemove(req.user.id)
    .then(() => res.status(200).json({ message: 'User removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
