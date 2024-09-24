const UserModel = require("../model/UserSchema");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const ChatModel = require("../model/ChatSchema");

const registerUser = async (req,res) => {
    try {
        const { userName, email, password } = req.body;
        const userExist = await UserModel.findOne({email : req.body.email});
        if(userExist){
            res.status(400).json({ message : "This email address is already exist"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await UserModel.create({
            userName, email, password : hashPassword
        })
        if(newUser){
            res.json({ message : "User Register successfully.",status : true});
        }
        else{
            res.json({ message : "Requested data is not valid, Please try it again", status : false});
        }
    } catch (error) {
        console.log(error); 
        // res.json({ message : "Something went wrong, please try again."});
    }
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const userData = await UserModel.findOne({email : req.body.email});
        if(!userData){
            res.status(400).json({ message : "User does not exist. Please create a user."});
        }
        bcrypt.compare(req.body.password,userData.password,(err,data)=>{
            if(data){
                let obj = {"id": userData._id , "userName" : userData.userName , "email" : userData.email};
                const token = jwt.sign({email:userData.email,userId:userData._id},process.env.JWT_SECRET_KEY,{expiresIn: '1d'});
                res.json({message : "login successfully",status : true , data : obj,token : token});
            }
            else{
                res.json({message : "Incorrect email & password, Please try it again.",status : false});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//Email Sending Config (Nodemailer Setup)
const transporter  = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "dipshaj64@gmail.com",
        pass : "jsys qqns jxss jzji"
    }
})

const sendVerificationEmail = async (req,res) => {
    try {
        const { email } = req.body;
        const { userId } = req.body.id;
        const error = validationResult(req);
        if(!error.isEmpty()){
            res.json({error : error.array()});
        }
        const userData = await UserModel.findOne({email : req.body.email});
        if(userData){
            res.json({ message : `${req.body.email} is already exist.`,status:false});
        }
        else{
            const token = jwt.sign({email:req.body.email,userId:req.body.id},process.env.JWT_SECRET_KEY,{expiresIn: '1d'});
            // SENT VERIFICATION URL INTO MAIL
            const verificationUrl = `http://localhost:3000/verify?token=${token}`
            // const verificationUrl = `http://localhost:${process.env.PORT}/api/auth/verifyEmail/${token}`;
            let mailTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Invitation</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                }
                .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                text-align: center;
                padding-bottom: 20px;
                }
                .header img {
                width: 100px;
                }
                .content {
                text-align: center;
                padding: 20px;
                }
                .content h2 {
                font-size: 24px;
                color: #333;
                }
                .content p {
                font-size: 16px;
                color: #555;
                }
                .avatar-container {
                display: flex;
                justify-content: center;
                margin: 10px 0;
                }
                .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin: 0 5px;
                object-fit: cover;
                }
                .button {
                text-align: center;
                margin-top: 20px;
                }
                .button a {
                background-color: #7269ef;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                }
                .footer {
                padding-top: 20px;
                text-align: center;
                color: #888;
                font-size: 12px;
                }
            </style>
            </head>
            <body>
            <div class="email-container">
                <div class="header">
                <img src="https://themes.themesbrand.com/chatvia/vue/v-light/img/logo.e1090ec2.svg" alt="Slack Logo">
                </div>
                <div class="content">
                <h2>Chatvia has invited you to join app</h2>
                <p>Join the conversation in a workspace of <strong>Chatvia</strong>.</p>
                <div class="button">
                    <a href="${verificationUrl}" target="_blank">JOIN CHATVIA</a>
                </div>
                </div>
                <div class="footer">
                <p>What is Chatvia?</p>
                <p>Chatvia is a messaging app for teams, a place you can collaborate on projects and organize conversations — so you can work together, no matter where you are.</p>
                </div>
            </div>
            </body>
            </html>
            `;
            const mailOption = {
                from : process.env.NODEMAILER_EMAIL,
                to : email,
                subject : "Let's verify your email",
                html : mailTemplate
            }
            let info = await transporter.sendMail(mailOption);
            res.json({message : "Invititaion mail has been send to your email. Please verify it.",status: true , data :info})
        }
    } catch (error) {
        console.log(error);
    }
}

// After verify the email, Create that New user & add that user as a chat user
const verifyEmailCreateUser =  async (req,res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.data.password,10);
        console.log("req.body.data.",req.body);
        const newUser = await UserModel.create({
            email : req.body.data.email, password : hashPassword, contacts : req.body.userId, userName : req.body.data.userName
        })
        const updateContact = await UserModel.findByIdAndUpdate(req.body.userId, { $push : {contacts : newUser._id}});
        const userObj = [req.body.userId,newUser._id];
        const chatUser = await ChatModel.create({participants : userObj});
        res.json({message : "Chat user create successfully.",status :true});

        // const { token } = req.params;
        // jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{
        //     if(err){
        //         return res.json({message : 'valid or expired token'})
        //     }
        //     const { email } = decode;
        //     res.send(`<h1>Email ${email} has been successfully verified!</h1>`);
        // })
    } catch (error) {
        console.log(error);
    }
}

// Get Logged In user details
const getUserProfile = async(req,res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if(!user){
            res.json({message : "User Not Found", status : false})
        }
        res.json({message : "User Profile get successfully.", status: true, data : user});
    } catch (error) {
        console.log(error);
    }
}

// Get All contact of User
const getUserContacts = async (req,res) => {
    try {
        //  populate is Store all the details of User from that Schema object ID
        const user = await UserModel.findById(req.params.id).populate("contacts");
        if(!user){
            res.json({message : "User not found", status : false});
        }
        res.json({message : "All the contact is get successfully.", status : true, data : user.contacts})
    } catch (error) {
        console.log(error);
    }
}

const updateUserProfile = async (req,res) => {
    try {
        const userId = req.params.id;
        const userData = await UserModel.findByIdAndUpdate(id,{$set : req.body},{new : true});
        res.json({message : "User Updated successfully", status : true, data: updateUser});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser, loginUser, sendVerificationEmail, verifyEmailCreateUser, getUserProfile, getUserContacts, updateUserProfile };