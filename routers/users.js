const express = require("express");
const users = express.Router();

const {
    validateSignup,
    doPasswordsMatch,
    areEmailAndNicknameUnique,
    hashPassword,
} = require("../middleware/users/signup");
const signupUser = require("../controllers/users");

users.post(
    "/signup",
    validateSignup,
    doPasswordsMatch,
    areEmailAndNicknameUnique,
    hashPassword,
    signupUser
);

module.exports = users;
