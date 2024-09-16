const UserModel = require("../model/UserSchema");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator")

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
                let obj = {"id": userData._id , "userName" : userData.userName , "email" : userData.email}
                // let token = generateToken(obj);
                res.json({message : "login successfully",status : true , data : obj});
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
    service : "Gmail",
    auth : {
        user : process.env.NODEMAILER_EMAIL,
        pass : process.env.NODEMAILER_PASS
    }
})

const sendVerificationEmail = async (req,res) => {
    try {
        const { email } = req.body;
        console.log("REWQQQQQ", req.body.email);
        const error = validationResult(req);
        if(!error.isEmpty()){
            console.log("IS AN ERROR");
            res.json({error : error.array()});
        }
        const token = jwt.sign({email},process.env.JWT_SECRET_KEY,{expiresIn: '1h'});
        // SENT VERIFICATION URL INTO MAIL
        const verificationUrl = `http://localhost:${process.env.PORT}/api/auth/verifyEmail/${token}`;
        console.log("token.." ,verificationUrl);
        const mailOption = {
            from : process.env.NODEMAILER_EMAIL,
            to : email,
            subject : "Let's verify your email",
            html : `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f7fa;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        text-align: center;
                        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .logo {
                        margin-bottom: 20px;
                    }
                    .logo img {
                        width: 100px;
                    }
                    .heading {
                        font-size: 24px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .subheading {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 30px;
                    }
                    .button {
                        background-color: #00ad9f;
                        color: white;
                        padding: 12px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 16px;
                        display: inline-block;
                    }
                    .button:hover {
                        background-color: #008f85;
                    }
                    .footer {
                        font-size: 12px;
                        color: #888;
                        margin-top: 30px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="heading">
                        You're nearly there!
                    </div>
                    <div class="subheading">
                        Verify your email address to log in and get started.
                    </div>
                    <a href="${verificationUrl}" class="button">Verify Email</a>
                    <div class="footer">
                        © 2024 Your Company. All rights reserved. <br>
                        <a href="https://yourcompany.com/support" style="color: #00ad9f;">Support</a>
                    </div>
                </div>
            </body>
            </html>
        `
        }
        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                return res.json({ message: 'Error sending email' });
            }
            else {
                return res.json({ message: 'Verification email sent!' })
            }
        })

    } catch (error) {
        console.log(error);
    }
}


const verifyEmail =  async (req,res) => {
    try {
        const { token } = req.params;
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{
            if(err){
                return res.json({message : 'valid or expired token'})
            }
            const { email } = decode;
            res.send(`<h1>Email ${email} has been successfully verified!</h1>`);
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser, loginUser, sendVerificationEmail, verifyEmail };