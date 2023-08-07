const express = require("express")
const router = express.Router();
const {registerUser,loginUser,getUser,getAllUser,findUser} = require("../controllers/userController")
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/:userId",getUser)
router.get("/get/all",getAllUser)
router.get("/find/:recipientId",findUser)
module.exports = router