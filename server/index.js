const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

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

const corsOption = {
    origin : true
}
app.use(cors(corsOption));
connectDb();

app.use("/api/auth",require("./routes/authRoutes"));

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server is running...", port);
})
