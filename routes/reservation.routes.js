const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue.model');
const Booking = require('../models/Booking.model');
const Promoter = require('../models/Promoter.model');

router.get('/search', (req, res, next) => {
  Venue.find()
    .then((venues) => res.status(200).json(venues))
    .catch((err) => res.status(500).json(err));
});

router.post('/search', (req, res, next) => {
  console.log('probando ruta');
  const { name, capacity, city, date } = req.body;

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  const filterObject = {};
  filterObject.date = { $nin: [date] };

  Venue.find(filterObject)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/venue/:id', (req, res, next) => {
  const { id } = req.params;
  Venue.findOne({ _id: id})
    .then((venue) => res.status(200).json(venue))
    .catch((err) => res.status(500).json(err));
});

// router.post('/venue/:id/book', (req, res, next) => {
//   console.log('probando ruta');
//   const { id } = req.params;
//   const {name, city, calendar} = req.body;

//   Booking.create({
//       promoter: req.session.currentUser._id,
//       venue: id,
//       date: req.body.calendar
//       bookingDate: Date.now(),
//   })
//   .then((newBooking) => {
//     Venue.updateOne({_id: id}, push {new: true})
//     .then (update prom)
//     res.status(200).json(newBooking)

//   })
 
// });

router.put('/booking/:id', (req, res, next) => {
  const { id } = req.params;
  Booking.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new: true })
    .then((booking) => res.status(200).json(booking))
    .catch((err) => res.status(500).json(err));
});


router.delete('/booking/:id', (req, res, next) => {
  const { id } = req.params;
  Booking.findOneAndRemove({ _id: id, user: req.user.id})
  .then(() => res.status(200).json({ message: `Booking ${id} deleted`}))
  .catch(err => res.status(500).json(err))
})

module.exports = router;
