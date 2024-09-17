const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, sendVerificationEmail, verifyEmailCreateUser, getUserProfile, getUserContacts, updateUserProfile  } = require("../controller/authController");

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/send-email",[body('email').isEmail().withMessage('Enter a valid email')],sendVerificationEmail);
router.post("/verifyEmailUser",verifyEmailCreateUser);
router.get("/:id",getUserProfile);
router.get("/:id/contacts",getUserContacts);
router.put("/:id",updateUserProfile);

module.exports = router;