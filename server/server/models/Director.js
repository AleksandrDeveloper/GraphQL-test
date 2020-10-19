const {Schema,model} = require('mongoose')


const Director = new Schema({
    name:String,
    age:Number,
    // movies:[
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Movie' 
    //     }
    // ],
    // director:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Movie' 
    // }
})


module.exports = model('Director',Director)