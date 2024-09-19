const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }],
    lastMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type : Date,
        default : Date.now
    }
},{
    timestamps : true 
})

module.exports = mongoose.model("Chat", chatSchema);