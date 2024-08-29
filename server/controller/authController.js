const UserModel = require("../model/UserSchema");
const bcrypt = require("bcryptjs");


const registerUser = async (req,res) => {
    try {
        const { userName, email, password } = req.body;
        const userExist = await findOne({email : req.body.email});
        if(userExist){
            res.status(400).json({ message : "This email address is already exist"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await UserModel.create({
            userName, email, hashPassword
        })
        if(newUser){
            res.json({ message : "User Register successfully.",status : true});
        }
        else{
            res.json({ message : "Requested data is not valid, Please try it again", status : false});
        }
    } catch (error) {
        res.json({ message : "Something went wrong, please try again."});
        console.log(error); 
    }
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const userData = await UserModel.findOne({email : req.body.email});
        if(!userData){
            res.status(400).json({ message : "User does not exist. Please create a user."});
        }
        bcrypt.compare(req.body.password,userExist.password,(err,data)=>{
            if(data){
                let obj = {"id": userData._id , "userName" : userData.userName , "email" : userData.email}
                let token = generateToken(obj);
                res.json({message : "login successfully",status : true , data : obj,token:token});
            }
            else{
                res.json({message : "Incorrect email & password, Please try it again.",status : false});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser, loginUser };