const userModel = require("../models/users");
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
// const { create } = require("../models/users");
const createToken = (_id) => {
       const jwtkey = process.env.JWT_SECRET_KEY
       return jwt.sign({_id},jwtkey,{expiresIn: "3d"})
}
const registerUser = async (req,res) => {
      try {
           const {name,email,password,image} = req.body
           let user = await userModel.findOne({email})
           if(user) return res.status(400).json("user with the riven email already exist...")
           if(!email || !name || !password ) return res.status(400).json("All fields are required")
           if(!validator.isEmail(email)) return res.status(400).json("Email must be a valid email...")
           if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password...")
           if(image){
                const uploadRes = await cloudinary.uploader.upload(image, {
                       upload_preset: "imageGallery"
                })
                user = new userModel({
                    name,
                    email,
                    password,
                    image:uploadRes
                 })
           }else {
            user = new userModel({
                name,
                email,
                password,
                
             })
           }
          
           const salt = await bcrypt.genSalt(10)
           user.password = await bcrypt.hash(user.password,salt)
           await user.save()
           const token = createToken(user._id)
           let imageUrl = await userModel.findOne({email})
           res.status(200).json({
            _id:user._id,
            name,
            email,
            image:imageUrl.image?.url ? imageUrl.image.url : null,
            token


           })
      }catch(err){
        console.log(err);
        res.status(500).send(err);
      }

}
const loginUser = async(req,res) => {
       const {email,password} = req.body
       try {
           
            let user = await userModel.findOne({email})
            if(!user) return res.status(400).json("Invalid email or password")
            const isValidPassword = await bcrypt.compare(password,user.password)
            if(!isValidPassword) return res.status(400).json("Invalid email or password")
            const token = createToken(user._id)
            res.status(200).json({
                 _id:user._id,
                 name:user.name,
                 email:user.email,
                 image:user.image ? user.image.url : null,
                 token

            })
       }catch(err) {
           console.log(err)
           res.status(500).send(err)
       }
}
const getUser = async(req,res)=> {
     const userId = req.params.userId
     try {
             let response = await userModel.findOne({_id:[userId]})
             res.status(200).json(response)
     }catch(err){
          console.log(err)
          res.status(500).send(err)
          }
}
const  getAllUser = async(req,res) => {
         try {
             let response = await userModel.find()
             res.status(200).json(response)
         }catch(err){
          console.log(err)
          res.status(500).json(err)
         }
}
const findUser = async(req,res)=> {
      const recipientId = req.params.recipientId
      try {
          const user = await userModel.findById(recipientId)
          res.status(200).json(user)
       }catch(error){
           console.log(error)
           res.status(500).json(error)
       }
}
module.exports = {registerUser,loginUser,getUser,getAllUser,findUser}
