const express =  require("express");
const router = express.Router();
const { createChat, getUserChats, getChatById, updateGroupChat } = require("../controller/chatController");

router.post("/",createChat);
router.get("/:userId",getUserChats);
router.get("/details/:chatId/",getChatById);
router.put("/:chatId",updateGroupChat);

module.exports = router;