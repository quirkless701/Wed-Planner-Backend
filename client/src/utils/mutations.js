import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_INSPIRATION = gql`
  mutation addInspiration($inspirationData: NewInspirationInput!) {
    addInspiration(inspirationData: $inspirationData) {
      savedInspirations {
        id
        likes
        backgroundImage
        alt_description
        raw
      }
    }
  }
`;

export const REMOVE_INSPIRATION = gql`
  mutation removeInspiration($inspirationId: String!) {
    removeInspiration(inspirationId: $inspirationId) {
      savedInspirations {
        id
        likes
        backgroundImage
        alt_description
        raw
      }
    }
  }
`;