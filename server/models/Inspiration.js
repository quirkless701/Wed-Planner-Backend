const { Schema } = require('mongoose');

const inspirationSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  alt_description: {
    type: String,
    required: true,
  },
  raw: {
    type: String,
    required: true,
  },
});

module.exports = inspirationSchema;