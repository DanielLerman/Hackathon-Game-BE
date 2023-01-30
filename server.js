const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const users = require("./routers/users");
const scores = require("./routers/scores");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/users", users);
app.use("/scores", scores);

function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.log("There was a problem starting the server");
    }
}

startServer();
