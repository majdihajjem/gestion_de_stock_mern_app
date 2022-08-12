const mongoose = require('mongoose')

const userSchema=mongoose.Schema({
    username: {
        type:'String',
        required: true
    },
    email: {type:'String', required:true},
    password: {type:'String', required:true},
    phoneNumber: {type:'Number'},
    role: { 
            type:'String',
            enum: ['admin', 'customer'],
            default: 'customer'}

})
module.exports =mongoose.model('user',userSchema);