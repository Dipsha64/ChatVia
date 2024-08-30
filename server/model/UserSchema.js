const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    googleId : {
        type : String
    },
    email : {
        type : String,
        required : [true, "Email is Required."],
        unique : true
    },
    userName : {
        type : String,
    },
    password : {
        type : String,
    },
    phoneNumber : {
        type : Number
    },
    profilePhoto : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    },
    pincode : {
        type : String
    }
},{
    timestamps : true 
});

module.exports = mongoose.model("User",userSchema);