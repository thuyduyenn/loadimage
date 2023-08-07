const express = require("express")
const router = express.Router();
const {addHeart,getHeart} = require("../controllers/heartController")
router.post("/add",addHeart)
router.get("/show",getHeart)
module.exports = router
