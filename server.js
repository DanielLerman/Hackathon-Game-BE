const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./database/dbConfig");

const users = require("./routers/users");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/users", users);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode).send(err.message);
});
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
const {
    findAvailableRoom,
    joinRoom,
    findUserRoom,
    announceToRoom,
    removeUserFromRoom,
} = require("./controllers/Sockets");

const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let usersSock = [];
let points = [];
socketIO.on("connection", socket => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("user-connected", () => {
        joinRoom(findAvailableRoom(), socket);
    });
    socket.on("disconnect", reason => {
        playerLeft(socket);
    });
    socket.on("newUser", data => {
        usersSock.push(data);
        console.log(usersSock);
        socketIO.emit("newUserResponse", usersSock);
    });
    socket.on("points", dataPoints => {
        points.push(dataPoints);
        console.log(points);
        socketIO.emit("pointsResponse", points);
    });
});

function playerLeft(socket) {
    const roomNum = findUserRoom(socket.id);
    removeUserFromRoom(roomNum, socket.id);
    announceToRoom(roomNum, socket, "player-left", false);
    console.log(`🔥: ${socket.id} user just left!`);
}

connectDB();

mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
    http.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
