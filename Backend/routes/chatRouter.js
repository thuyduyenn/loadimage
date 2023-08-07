const express = require("express")
const router = express.Router();
const { createChat,getChats,repChat } = require("../controllers/chatController")

router.post("/create-chat",createChat)
router.post("/rep",repChat)
router.get("/:userId",getChats)

module.exports = router