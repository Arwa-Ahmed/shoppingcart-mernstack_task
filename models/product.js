const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        reqiured:true
    },
    price:{
        type:Number,
        reqiured:true
    },
    image:{
        type:String,
        reqiured:true
    },
    description:{
        require:true,
        type:String
    },
    countInStock: {
         type: Number,
          default: 0,
         required: true },


})

module.exports = mongoose.model('Product',productSchema);