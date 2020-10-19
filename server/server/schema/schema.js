const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const Director = require('../models/Director')
const Movie = require('../models/Movie')

// const movies = [
// 	{ id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1', },
// 	{ id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2', },
// 	{ id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3', },
// 	{ id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4', },
// 	{ id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
// 	{ id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
// 	{ id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1' },
// 	{ id: '7', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4' },
// ];
// const directors = [
// 	{ id: '1', name: 'Quentin Tarantino', age: 55 },
// 	{ id: '2', name: 'Michael Radford', age: 72 },
// 	{ id: '3', name: 'James McTeigue', age: 51 },
// 	{ id: '4', name: 'Guy Ritchie', age: 50 },
// ];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directors: {
      type: Directors,
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const Directors = new GraphQLObjectType({
  name: "Directors",
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      movies: {
        type: new GraphQLList(MovieType),
        resolve(parent, args) {
            console.log('--------',parent,'ddd',parent._id);
          return Movie.find({directorId:parent._id})
        },
      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id)
      },
    },
    director: {
      type: Directors,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id)
      },
    },
    movies: {
      type: GraphQLList(MovieType),
      resolve(paren, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: GraphQLList(Directors),
      resolve(paren, args) {
        return Director.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
