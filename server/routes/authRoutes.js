const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, sendVerificationEmail, verifyEmail, getUserProfile, getUserContacts, updateUserProfile  } = require("../controller/authController");

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/send-email",[body('email').isEmail().withMessage('Enter a valid email')],sendVerificationEmail);
router.get("/verifyEmail/:token",verifyEmail);
router.get("/:id",getUserProfile);
router.get("/:id/contacts",getUserContacts);
router.put("/:id",updateUserProfile);

module.exports = router;