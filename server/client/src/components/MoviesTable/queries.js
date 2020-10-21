import { gql } from "apollo-boost";

export const moviesQuery = gql`
  {
    movies {
      id
      name
      genre
      directors {
        name 
      }
    }
  }
`;
 