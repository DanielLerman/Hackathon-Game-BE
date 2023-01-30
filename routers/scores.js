const express = require("express");
const scores = express.Router();

const { addScore, getAllUsersScores } = require("../controllers/scores");
const {
    protectedToAnyUser,
    protectedToLoggedInUserOnly,
} = require("../middleware/users/protected");

scores.get(protectedToAnyUser, getAllUsersScores); // Get All Users Score History API (Protected to any user)
scores.post(addScore); // Add Score API

scores.get("/:id"); // Get Logged In User’s Score history API (Protected to logged in user only)
scores.get("/last/:id"); // Get user last (latest) score API (Protected to logged in user only)
scores.get("/high/:id"); // Get user highest score API (Protected to logged in user only)

module.exports = scores;
