const chatModel = require("../models/chat")


const createChat = async(req,res)=> {
   const {senderId,ReceiveId,status} = req.body
   try{
       const chat = await chatModel.findOne({
           members: { $all: [senderId,ReceiveId]}
       })
       if (chat) return res.status(200).json(chat)
       const newChat = new chatModel({
           members: [senderId,ReceiveId],
           status: status
       })
       const response = await newChat.save();
       res.status(200).json(response)

   }catch(error) {
        console.log(error)
        res.status(500).json(error)
   }
}
const getChats = async(req,res) => {

     const  userId  = req.params.userId
      try {
            const chats = await chatModel.find({
                members: {$in: [userId]}
            })
            res.status(200).json(chats)
      }catch (error){
        console.log(error)
        res.status(500).json(error)
      }
}
const repChat = async(req,res)=> {
       const {senderId,RecieveId} = req.body
       try {
            const rep = {
                 members: {$all: [senderId,RecieveId]}

            }
            const update = {
                status: "Chấp nhận"
            }
            const response = await chatModel.findOneAndUpdate(rep,update)
            res.status(200).json(response)
       }catch(error){
             console.log(error)
             res.status(500).json(error)
       }
}
module.exports = {createChat,getChats,repChat}