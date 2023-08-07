const galleryModel = require("../models/gallery");

const cloudinary = require("../utils/cloudinary");
const uploadImage = async(req,res) => {
    const {text,image,userId} = req.body
 try {
    
     if(image){
         const uploadRes = await cloudinary.uploader.upload(image,{
                upload_preset: "galleryImage"
         })
         upload = new galleryModel({
              userId:userId,
              status:text,
              image:uploadRes
         })
         await upload.save()
         res.status(200).json(upload) 
        
     }
    
 }catch(err){
      console.log(err)
      res.status(500).send(err)
 }
}
const getImage = async(req,res) => {
      try{
        const imageList = await galleryModel.find()
        res.status(200).json(imageList)
      }
      catch(err){
          console.log(err)
          res.status(500).json(err)
      }
}
const getImageUser = async(req,res) => {
        const userId = req.params.userId
        try {
           const imageList = await galleryModel.find({
                userId: {$in: [userId]}
           })
           res.status(200).json(imageList)
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
}
module.exports = {uploadImage,getImage,getImageUser}