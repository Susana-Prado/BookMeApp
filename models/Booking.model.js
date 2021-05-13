const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({   
    promoter: {type: Schema.Types.ObjectId, ref: 'Promoter'},
    venue: {type: Schema.Types.ObjectId, ref: 'Venue'},
    bookingDate : Date,    
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;