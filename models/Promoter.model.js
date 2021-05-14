const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promoterSchema = new Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  image: {type: String},
  address: {
            street: String,
            number: Number,
            city: String,
            country: String
        },
 contactInfo: {
        tel: Number,
        email: String
 },
  password: {type: String, required: true},
  CIF: {type: String, required: true},
  bookings: [{type: Schema.Types.ObjectId, ref: 'Booking' }]
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

const Promoter = mongoose.model('Promoter', promoterSchema);

module.exports = Promoter;