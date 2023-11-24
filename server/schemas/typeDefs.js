// initialize variables
const { gql } = require('apollo-server-express');

// define the GraphQL type definitions
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedPlaces:[Place] 
    placeCount: Int

    savedInspirations: [Inspiration]!
  }
  type Inspiration {
    id: String!
    likes: Int!
    backgroundImage: String!
    alt_description: String!
    raw: String!
  }
  input NewInspirationInput {
    id: String!
    likes: Int!
    backgroundImage: String!
    alt_description: String!
    raw: String!
  }
  type Place {
    location: String!
    guestCapacity: Int!
    contactNumber: String!
    description: String!
  }
  input CreateUserInput{
    username: String!
    email: String!
    password: String!
  }
  type Auth {
    token: String!
    user: User!
  }  

  type Query {
    getUser: User
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addInspiration(inspirationData: NewInspirationInput!): User!
    removeInspiration(inspirationId: String!): User!
  }
`;

// export typedefs
module.exports = typeDefs;