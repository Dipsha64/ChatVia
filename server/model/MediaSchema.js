const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
    uploader : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    chat : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat",
    },
    message : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
    },
    fileType : {
        type : String,
        required : true
    }, // e.g., 'image/png', 'video/mp4'
    fileUrl : {
        type : String,
        required : true
    }, // URL to the file
    size : {
        type : Number,
        required : true
    }// File size in bytes
},{
    timestamps : true
})

module.exports = mongoose.model("Media", mediaSchema);