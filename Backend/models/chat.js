const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
      members: Array,
      status: {
        
               type: String,
               required: true, 
               minlength: 3, 
               maxlength: 3024
           }
  },
  {
       timestamps: true,
  }
)
const chatModel = mongoose.model("Chat",chatSchema)
module.exports = chatModel;