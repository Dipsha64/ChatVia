const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    chat : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat",
        required : true
    },
    messageContent : {
        type : String,
        required : true
    }, // Message text
    media : {
        type : String,
        default : ""
    }, // URL for media (image, video, etc.)
    messageType : {
        type : String,
        enum : ['text', 'image', 'video', 'audio', 'document'],
        default: 'text'
    },
    isSeen : {
        type : Boolean,
        default : false
    }
},{
    timeStamps : true
});

module.exports = mongoose.model("Message",messageSchema);