const messageModel = require("../models/messages")
const createMessage = async(req,res)=> {
    const {senderId,chatId,text} = req.body 
    const message = new messageModel({
        senderId,
        chatId,
        text
    })
    try{
        const response = await message.save()
        res.status(200).json(response)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}
//getMessage
const getMessage = async(req,res)=> {
        const chatId = req.params.chatId
        try {
               const message = await messageModel.find({chatId})
               res.status(200).json(message)
        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
}
const getAllMessages = async(req,res)=> {
    try {
        const messages = await messageModel.find()
        res.status(200).json(messages)
    }catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports = {createMessage,getMessage,getAllMessages}