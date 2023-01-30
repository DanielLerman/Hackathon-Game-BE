const express = require("express");
const users = express.Router();

users.get("/signup", (req, res) => res.send("Working fine"));

module.exports = users;
