const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userModel = require("./model/UserSchema");

// Session is used to create Unique Encrypted ID for Google Login
app.use(session({
    secret : "2145dfvrtghtyu67wq21",
    resave : false,
    saveUninitialized : true
}))

// Setup passport
app.use(passport.initialize());
// Passport create session for us
app.use(passport.session());

// Passport Google OAuth Strategy
passport.use(
    new OAuth2Strategy({
        clientID : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRETKEY,
        callbackURL : "/auth/google/callback",
        scope : ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile..." ,profile);
        try {
            let user = await userModel.findOne({googleId : profile.id});

            if(!user){
                var newUser = await userModel.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                })
            }
            done(null,newUser)
        } catch (error) {
            done(error,false);
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser(async (id,done)=>{
    const user = await userModel.find(id);
    done(null,user);
})

const corsOption = {
    origin : true
}
app.use(cors(corsOption));
connectDb();

// Initial Google Auth Login
app.get("/auth/google",passport.authenticate("google",{scope : ["profile", "email"]}));
app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect : "http://localhost:3000/chat",
    failureRedirect : "http://localhost:3000/login"
}))

app.use("/api/auth",require("./routes/authRoutes"));

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server is running...", port);
})
