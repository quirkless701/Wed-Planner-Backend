// initialize variables
const { Schema, model } = require('mongoose'),
      placeSchema = require('./places'),
      bcrypt = require('bcrypt'),
      inspirationSchema = require('./Inspiration');
// define the userSchema
const userSchema = new Schema(
  {
    // define the username field
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // define the email field
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    // define the password field
    password: {
      type: String,
      required: true,
    },

    savedPlaces: [placeSchema],

    // define the savedBooks field as an array of data that adheres to the bookSchema
    savedInspirations: [inspirationSchema],

  },
  // define options for the schema
  // include virtual properties when converting to JSON
  {
    toJSON: {
      virtuals: true, 
    },
  }
);

// middleware function to hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // number of times the password hashing algorithm will be executed
    this.password = await bcrypt.hash(this.password, saltRounds); // hash the password
  }
  // pass control to the next middleware function in the stack
  next();
});

// method to compare and validate the user's password during login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password); // cmpare the provided password with the hashed password
};
userSchema.virtual('placeCount').get(function () {
  return this.savedPlaces.length;
});
// create the User model using the userSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;