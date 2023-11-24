import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      username
      email
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