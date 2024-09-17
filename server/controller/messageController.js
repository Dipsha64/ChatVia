const MessageSchema = require("../model/MessageSchema");
const ChatSchema = require("../model/ChatSchema");

const sendMessage = async (req,res) => {
    try {
        const { sender, chat, messageContent, media, messageType } = req.body;
        const newMessage = await MessageSchema.create({sender, chat, messageContent, media, messageType});
        await ChatSchema.findByIdAndUpdate(chat,{ lastMessage: newMessage._id });
        res.json({message : "Message send successfully", status : true,data : newMessage});
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error sending message' });
    }
}

// Get all messages for a chat
const getChatMessages = async (req,res) => {
    try {
        const messages = await MessageSchema.find({chat : req.params.chatId}).populate("sender");
        res.json({message : "Messages get successfully.",status : true, data : messages});
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error fetching messages' });
    }
}

const markMessageSeen = async (req,res) => {
    try {
        const msgId = req.params.messageId;
        const updateMessage = await MessageSchema.findByIdAndUpdate(msgId, { $set : req.body},{new : true});
        res.json({message : "Message updated successfully.",status : true, data : updateMessage});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMessage, getChatMessages, markMessageSeen };