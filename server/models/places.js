const {Schema} = require('mongoose')
const placeSchema = new Schema(
  {
    
    location: {
      type: String,
      required: true,
    },
    guestCapacity: {
      type: Number,
      required: true,
    },
    contactNumber: {
      type: String,
      required: false,
      // match: [/.+@.+\..+/, 'Must use a valid phone number'],
    },
    description: {
      type: String,
      required: true,
    },
  },
);

module.exports = placeSchema;