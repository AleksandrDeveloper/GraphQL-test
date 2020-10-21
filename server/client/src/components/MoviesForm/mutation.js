import { gql } from "apollo-boost";

export const addMovie = gql`
  mutation addMovie ($name: String, $genre:String) {
    addMovie(name: $name, genre: $genre) {
      name
    }
  }
`;


export const getDirects = gql`
  {
    directors {
        name
        id
    }
  }
`;

