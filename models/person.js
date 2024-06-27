const mongoose = require("mongoose")

const personSchema = mongoose.Schema({
    name :{
        type:String,
       
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter', 'manager'],
       
    },
    mobile:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    salary:{
        type:Number,
        required: true
    }
})

//creating person model
const Person =mongoose.model('Person',personSchema);

module.exports=Person;