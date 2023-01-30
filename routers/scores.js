const express = require("express");
const scores = express.Router();

scores.get(); // Get All Users Score History API
scores.post(); // Add Score API

scores.get("/:id"); // Get Logged In User’s Score history API (Protected to logged in user only)
scores.get("/last/:id"); // Get user last (latest) score API (Protected to logged in user only)
scores.get("/high/:id"); // Get user highest score API (Protected to logged in user only)

module.exports = scores;
