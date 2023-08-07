const express = require("express")
const router = express.Router();
const {uploadImage,getImage,getImageUser} = require("../controllers/galleryController")
router.post("/upload",uploadImage)

router.get("/store",getImage)
router.get("/find/:userId",getImageUser)
module.exports = router