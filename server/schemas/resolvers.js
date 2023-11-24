// initialize variables
const { User } = require('../models'),
      { generateAuthToken } = require("../utils/auth"),
      { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  // retrieve data from the server
  Query: {
    // retrieve user data
    getUser: async (_, __, context) => {
      // if no user object, throw authentication error
      if (!context.user) throw new AuthenticationError("Not logged in");
      // initialize variables
      const { email } = context.user;
      const user = await User.findOne({ email }).select("-__v -password");
      // return a user object based on email, removing the __v and password fields from the object
      return user;
    },
  },
  // modify data on the server
  Mutation: {
    createUser: async (_,input) => {
      // initialize variables
      const user = await User.create(input),
            token = generateAuthToken(user);
      // return token and user object
      return { token, user };
    },
    // authenticate the user
    login: async (_, { email, password }) => {
      // initialize variables
      const user = await User.findOne({ email });
      // if user is not found, or password is incorrect, throw an authentication error
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Incorrect credentials.");
      }
      // generate a token for the authenticated user
      const token = generateAuthToken(user);
      // return the token and user object
      return { token, user };
    },
    // save the inspiration to the user's savedInspirations array
    addInspiration: async (_, { inspirationData }, context) => {
      // if no user object, throw authentication error
      if (!context.user) throw new Error('Not authenticated.');
      // find user by id
      // push the inspiration to the savedInspirations array
      // new: true returns the updated object
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { savedInspirations: inspirationData } },
        { new: true }
      );
      return updatedUser;
    },
    // remove an inspiration from the user's savedInspirations array
    removeInspiration: async (_, { inspirationId }, context) => {
      // if no user object, throw authentication error
      if (!context.user) throw new Error('Not authenticated.');
      // find the user by their ID
      // remove the inspiration from the savedInspirations array
      // new: true returns the updated object
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedInspirations: { id: inspirationId } } },
        { new: true }
      );
      // return the updated user object
      return updatedUser;
    },
  },
};

// export the resolvers
module.exports = resolvers;