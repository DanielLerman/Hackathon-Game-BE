const express = require("express");
const scores = express.Router();

const {
    addScore,
    getAllUsersScores,
    getLoggedInUsersScores,
} = require("../controllers/scores");
const {
    protectedToAnyUser,
    protectedToLoggedInUserOnly,
} = require("../middleware/users/protected");

scores.get(protectedToAnyUser, getAllUsersScores); // Get All Users Score History API (Protected to any user)
scores.post(addScore); // Add Score API

scores.get("/:id", protectedToLoggedInUserOnly, getLoggedInUsersScores); // Get Logged In User’s Score history API (Protected to logged in user only)
scores.get("/last/:id", protectedToLoggedInUserOnly, getLoggedInUsersScores); // Get user last (latest) score API (Protected to logged in user only)
scores.get("/high/:id", protectedToLoggedInUserOnly, getLoggedInUsersScores); // Get user highest score API (Protected to logged in user only)

module.exports = scores;
