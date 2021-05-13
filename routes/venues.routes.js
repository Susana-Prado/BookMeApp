const express = require('express');
const Venue = require('../models/Venue.model');
const router = express.Router();

router.get('/', (req, res, next) => {
  Venue.find()
    .then((venues) => res.status(200).json(venues))
    .catch((err) => res.status(500).json(err));
});

router.post('/results', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Venue.findOne({ _id: id })
    .then((venue) => res.status(200).json(venue))
    .catch((err) => res.status(500).json(err));
});

router.post('/:id/book', (req, res, next) => {
  const { id } = req.params;

  Venue.updateOne(
    { _id: id },
    { $addToSet: { date: req.session.resultsDate } },
    { new: true }
  ).then(() => {
    Booking.create({
      promoter: req.session.currentUser._id,
      venue: id,
      date: req.session.resultsDate,
      bookingDate: Date.now(),
    })
      .then((reservation) => {
        res.status(200).json(reservation);
      })
      .catch((err) => res.status(500).json(err));
  });
});

module.exports = router;
