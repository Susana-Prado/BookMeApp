const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  promoter: { type: Schema.Types.ObjectId, ref: 'Promoter' },
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
  date: {type: Date},
  bookingDate: {type: Date},
},{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;

      return ret;
    }
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
