const rooms = [];

const findAvailableRoom = () => {
    const ind = rooms.findIndex((res) =>
        res.length < 2);
    return ind > -1 ? ind : rooms.length;
}

const joinRoom = (roomNum, socket) => {
    rooms[roomNum] = rooms[roomNum] === undefined ?
        [socket.id] : [...rooms[roomNum], socket.id];
    socket.join(roomNum);
    rooms[roomNum].length === 2
        ? socket.emit('game-started', false) &&
        socket.to(roomNum).emit('game-started', true)
        : socket.emit('game-joined')
}

const announceToRoom = (roomNum, socket, event, ...args) => {
    socket.to(roomNum).emit(event,...args);
}

const findUserRoom = (userId) => {
    let res = -1
    rooms.forEach((room, roomInd) => {
        room.find((user) => user === userId) ? res = roomInd : "";
    });
    return res;
}

const removeUserFromRoom = (roomNum, id) => {
    if (roomNum != -1)
        rooms[roomNum] = rooms[roomNum].filter((user) => user != id);
}

module.exports = { findAvailableRoom, joinRoom, announceToRoom, 
                   findUserRoom, removeUserFromRoom };