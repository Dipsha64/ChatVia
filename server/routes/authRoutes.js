const express = require("express");
const router = express.Router();
const { registerUser, loginUser, sendVerificationEmail, verifyEmail } = require("../controller/authController");

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/send-email",sendVerificationEmail);
router.get("/verifyEmail/:token",verifyEmail);

module.exports = router;