const express =  require("express");
const router = express.Router();
const { sendMessage, getChatMessages, markMessageSeen } = require("../controller/messageController");

router.post("/",sendMessage);
router.post("/:id",getChatMessages);
router.put("/:messageId/seen",markMessageSeen);

module.exports = router;