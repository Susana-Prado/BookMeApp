const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    username: {type: String, required: true, unique: true},
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
        tel: [Number],
        email: [String]
        },
    address: {
            street: String,
            number: Number,
            city: String,
            country: String
        },
    password: {type: String, required: true},
    CIF: {type: Number, required: true},
    capacity: {type: Number, required: true},
    rentingPrice: {type: Number, required: true},    
    image: {
        type: String,
        default: "https://res.cloudinary.com/parkfinder/image/upload/v1619196200/users/avatar_lkjiqe.png"
      },
    rider: {type: String, required: true},
    conditions: {type: String, required: true},
    license: {type: String, required: true},  
    merch: {type: Boolean},
    security: {type: Boolean},
    ticketOffice: {type: Boolean},    
    production: {type: Boolean},
    technicians: {type: Boolean},
    genre: { type: String, enum: [ "All", "Metal/Rock/Punk/Alternative", "Blues/Rock", "HipHop/Rap", "Jazz", "R&B/Soul", "Latin", "Folk/Acoustic", "Electronic", "Experimental" ] },
    confirmed: {type: Boolean, default: false},
    date: [{type: Date}],
    Bookings:  [{type: Schema.Types.ObjectId, ref: 'Booking'}]
},
{
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
}
)

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;