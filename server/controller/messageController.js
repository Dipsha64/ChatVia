const MessageSchema = require("../model/MessageSchema");
const ChatSchema = require("../model/ChatSchema");

const sendMessage = async (msgData) => {
    try {
        // const { loginUser, selectedChatUser, msgInfo } = req.body;
        const newMessage = await MessageSchema.create({sender : msgData.loginUser.id,receiver : msgData.selectedChatUser._id, messageContent : msgData.msgInfo});
        const isChatExist = await ChatSchema.findOne({
            participants : {$all: [msgData.loginUser.id, msgData.selectedChatUser._id]}
        })
        if(isChatExist){
            await ChatSchema.findByIdAndUpdate(isChatExist._id,{ lastMessage: newMessage._id });
        }
        res.json({message : "Message send successfully", status : true,data : newMessage});
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error sending message' });
    }
}

// Get all messages for a chat
const getChatMessages = async (userData) => {
    try {
        const getMessageConversation = await MessageSchema.find({
            "$or" : [
                { sender : userData.loginUser, receiver : userData.user},
                { sender : userData.user, receiver : userData.loginUser},
            ]
        }).sort({ updatedAt : -1 });
        return getMessageConversation;
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