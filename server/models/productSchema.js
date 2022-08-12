const mongoose = require('mongoose')

const productSchema=mongoose.Schema({
    title: {
        type:'String',
        required: true
    },
    image: {type:'String', required:true},
    description: {type:'String'},
    price: {type:'Number'},
    quantity: {type:'Number'}

})
module.exports =mongoose.model('product',productSchema);