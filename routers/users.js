const express = require("express");
const users = express.Router();

const {
    validateSignup,
    doPasswordsMatch,
    areEmailAndNicknameUnique,
    hashPassword,
} = require("../middleware/users/signup");

const {
    validateLogin,
    authenticateAndGetUser,
    generateCookie,
} = require("../middleware/users/login");

const { signupUser, loginUser } = require("../controllers/users");

users.post(
    "/signup",
    validateSignup,
    doPasswordsMatch,
    areEmailAndNicknameUnique,
    hashPassword,
    signupUser
);

users.post(
    "login",
    validateLogin,
    hashPassword,
    authenticateAndGetUser,
    generateCookie,
    loginUser
);

module.exports = users;
