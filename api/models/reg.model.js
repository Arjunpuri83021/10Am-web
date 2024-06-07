const mongoose =require('mongoose')

const MongoSchema=mongoose.Schema({
    profile:String,
    name:String,
    number:Number,
    email:String,
    password:String
})

module.exports= mongoose.model('10AmReg',MongoSchema)