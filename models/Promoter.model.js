const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promoterSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
      street: String,
      number: Number,
      city: String,
      country: String
  },
  contactInfo: {
    tel: [Number],
    email: [String]
  },
  password: {
    type: String,
    required: true,
  },
  CIF: {type: Number, required: true},  
  image: {
    type: String,
    default: "https://res.cloudinary.com/parkfinder/image/upload/v1619196200/users/avatar_lkjiqe.png"
  }
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

const Promoter = mongoose.model('Promoter', promoterSchema);

module.exports = Promoter;