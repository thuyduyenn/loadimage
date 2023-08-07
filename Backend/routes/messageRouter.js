const express = require("express")
const router = express.Router();
const {createMessage,getMessage,getAllMessages} = require("../controllers/messageController")
router.post("/",createMessage)
router.get("/:chatId",getMessage)
router.get("/all/messages",getAllMessages)
module.exports = router