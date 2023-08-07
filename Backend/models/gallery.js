const mongoose = require("mongoose")
const gallerySchema = new mongoose.Schema({
      userId:{
        type: String,
        required: true, 
        minlength: 3, 
        maxlength: 1024
      },
      status:{
        type: String,
        required: false, 
       
        maxlength: 1024
      },
      image: {
        type: Object ,
        required: true
      }
},{
    timestamps:true
})
const galleryModel =  mongoose.model("gallery",gallerySchema);
module.exports = galleryModel