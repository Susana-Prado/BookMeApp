const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue.model');
const Booking = require('../models/Booking.model');
const Promoter = require('../models/Promoter.model');

router.get('/search', (req, res, next) => {
  Venue.find()
    .populate('bookings')
    .then((venues) => res.status(200).json(venues))
    .catch((err) => res.status(500).json(err));
});

router.post('/search', (req, res, next) => {
  const { name, capacity, city, date } = req.body;

  const filterObject = {};
  if (name) {
    filterObject.name = name;
  }
  if (city  !=='---') {
    filterObject.adress.city = city;
  }
  if (capacity !=='---') {
    const lowerCap = parseInt(capacity.split('-')[0]);
    const higherCap = parseInt(capacity.split('-')[1]);
    filterObject.capacity = { $gte: lowerCap, $lte: higherCap };
  }

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  } else {
    filterObject.date = { $nin: [date] };
  }

  Venue.find(filterObject)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).json(err));
});

router.get('/venue/:id', (req, res, next) => {
  const { id } = req.params;
  Venue.findOne({ _id: id })
    .then((venue) => res.status(200).json(venue))
    .catch((err) => res.status(500).json(err));
});

router.post('/venue/:id/book', (req, res, next) => {
  const { id } = req.params;
  const { date } = req.body;

  Venue.findById(id)
    .then((venue) => {
      console.log(venue.date);
      if (venue.date.map(Number).includes(+new Date(date))) {
        return res.status(500).json({ message: 'Not available' });
      } else {
        Booking.create({
          promoter: req.user.id,
          venue: id,
          date: date,
          bookingDate: Date.now(),
        })
          .then((newBooking) => {
            Venue.updateOne(
              { _id: id },
              {
                $push: { bookings: newBooking.id },
                $push: { date: newBooking.date },
              },
              { new: true }
            )
              .then(() => {
                Promoter.updateOne(
                  { _id: req.user.id },
                  { $push: { bookings: newBooking.id } },
                  { new: true }
                )
                  .then(() => {
                    res.status(200).json(newBooking);
                  })
                  .catch((err) => res.status(500).json(err));
              })
              .catch((err) => res.status(500).json(err));
          })
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
});

router.put('/booking/:id', (req, res, next) => {
  const { id } = req.params;
  Booking.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  })
    .then((booking) => res.status(200).json(booking))
    .catch((err) => res.status(500).json(err));
});

router.delete('/booking/:id', (req, res, next) => {
  const { id } = req.params;
  Booking.findOneAndDelete({ _id: id })
    .then(() => res.status(200).json({ message: `Booking ${id} deleted` }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
