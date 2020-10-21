import { gql } from "apollo-boost";

export const addDireactor = gql`
  mutation addDireactor ($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      name
    }
  }
`;
