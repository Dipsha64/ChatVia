const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    name : { 
       type : String,
       required : true 
    },
    description : {
        type : String,
        default : ""
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }],
    groupIcon : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

module.exports = mongoose.Schema("Group",groupSchema);