const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  website: {type: String},
  location: {
    type: {
      type: String, 
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  },
  contactInfo: {
        tel: Number,
        email: String
  },
  password: {type: String, required: true},
  CIF: {type: String, required: true},
  capacity: {type: Number, required: true},
  rentingPrice: {type: Number},
  image:{type: String, default: '' },
  rider: {type: String, required: true},
  conditions: {type: String, required: true},
  license: {type: String, required: true},  
  date: [{type: Date}],
  merch: {type: Boolean},
  security: {type: Boolean},
  ticketOffice: {type: Boolean},
  merch: {type: Boolean},
  production: {type: Boolean},
  technicians: {type: Boolean},
  genre: { type: String, enum: [ "All", "Metal/Rock/Punk/Alternative", "Blues/Rock", "HipHop/Rap", "Jazz", 		"R&B/Soul", "Latin", "Folk/Acoustic", "Electronic", "Experimental" ] },
  bookings:  [{type: Schema.Types.ObjectId, ref: 'Booking'}]
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
})


const Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;