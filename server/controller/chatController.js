const ChatModel = require("../model/ChatSchema");

const createChat = async (req,res) => {
    try {
        const { participants } = req.body;
        const newChat = await ChatModel.create({participants});
        res.json({message : "New chat created successfully.", status : true, data : newChat});
    } catch (error) {
        console.log(error);
    }
}

// Get All Chats of Logged In User
const getUserChats = async (req,res) => {
    try {
        const chatData = await ChatModel.find({participants : {$in : [req.params.userId]}}).populate("participants").populate("lastMessage");
        res.json({message : "All chat get successfully", data : chatData, status: true});
    } catch (error) {
        console.log(error);
    }
}

// Get Particulat Chat
const getChatById = async (req,res) => {
    try {
        const chatData = await chatData.find(req.params.chatId).populate("participants").populate("lastMessage");
        if(!chatData){
            res.json({message : "Chat not found.",status:false});
        }
        res.json({message : "Chat get successfully.",status:true, data : chatData});
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error fetching chat' });
    }
}

// Update group chat details (for group chats)
const updateGroupChat = async (req,res) =>{
    try {
        const chatId = req.params.chatId;
        const updateChat = await ChatModel.findByIdAndUpdate(chatId,{$set : req.body},{new : true});
        res.json({message : "Chat updated successfully.", status : true, data : updateChat});
    } catch (error) {
       console.log(error); 
       res.json({ error: 'Error updating chat' });
    }
}

module.exports = { createChat, getUserChats, getChatById, updateGroupChat };