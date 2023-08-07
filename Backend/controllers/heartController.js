const heartModel = require("../models/heart")
const addHeart = async(req,res) => {
      const {imageId,userSender,userRe} = req.body

      try {
            heart = new heartModel({
                imageId:imageId,
                userSender:userSender,
                userRe:userRe

            })
            await heart.save()
            res.status(200).json({
                imageId:imageId,
                userSender:userSender,
                userRe:userRe

            })
      }catch(err){
        console.log(err)
        res.status(500).send(err)
      }
}
const getHeart = async(req,res) => {
   try {
         const response = await heartModel.find()
         res.status(200).json(response)
   }catch(err){
        console.log(err)
        res.status(500).json(err)
   }
}
module.exports = {addHeart,getHeart}