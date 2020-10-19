const {Schema,model} = require('mongoose')


const Movie = new Schema({
    name:String,
    genre:String,
    directorId:String,
    director:{
        type: Schema.Types.ObjectId,
        ref: 'Director' 
    }
})


module.exports = model('Movie',Movie)