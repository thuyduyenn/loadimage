const mongoose = require("mongoose")
const heartSchema = new mongoose.Schema({
     imageId:{
       
            type: String,
            required: true, 
            minlength: 3, 
            maxlength: 1024
        
     },
     userSender: {
        type: String,
        required: true, 
        minlength: 3, 
        maxlength: 1024
     },
     userRe:{
        type: String,
        required: true, 
        minlength: 3, 
        maxlength: 1024
     }

     
}, {
    timestamps:true,
})
const heartModel = mongoose.model("hearts",heartSchema)
module.exports = heartModel