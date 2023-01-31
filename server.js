const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require('mongoose');
const connectDB = require('./database/dbConfig')

const users = require("./routers/users");
const scores = require("./routers/scores");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/users", users);
app.use("/scores", scores);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode).send(err.message);
});

connectDB();

// function startServer() {
//     try {
//         app.listen(PORT, () => {
//             console.log(`Server listening on port ${PORT}`);
//         });
//     } catch (err) {
//         console.log("There was a problem starting the server");
//     }
// }

// startServer();


mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
     app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
});
