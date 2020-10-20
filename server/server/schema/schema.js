const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const Director = require("../models/Director");
const Movie = require("../models/Movie");


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
      name: { type: new GraphQLNonNull(GraphQLString) },
      age: { type: new GraphQLNonNull(GraphQLInt) },
      movies: {
        type: new GraphQLList(MovieType),
        resolve(parent, args) {
          return Movie.find({ directorId: parent._id });
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: Directors,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, { name, age }) {
        return new Director({
          name,
          age,
        }).save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parent, { name, genre }) {
        return new Movie({
          name,
          genre,
        }).save();
      },
    },
    removeDirector:{
      type:Directors,
      args:{
        id:{type:GraphQLID}
      },
      resolve(parent,{id}){
       return Director.findByIdAndRemove(id)
      }
    },
    removeMovie:{
      type:MovieType,
      args:{
        id:{type:GraphQLID}
      },
      resolve(parent,{id}){
        return Movie.findByIdAndRemove(id)
      }
    },
    updateDirector:{
      type:Directors,
      args:{
        id:{type:GraphQLID},
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent,{id,name,age}){
        return Director.findByIdAndUpdate(id,{
          $set:{name,age}
        },{new:true}) 
      }
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(args.id);
        return Movie.findById(args.id);
      },
    },
    director: {
      type: Directors,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id);
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
  mutation: Mutation,
});
