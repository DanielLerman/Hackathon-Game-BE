const jwt = require("jsonwebtoken");

function signToken(id, secret) {
    const token = jwt.sign(id, secret, {
        expiresIn: "1d",
    });
    return token;
}

function verifyToken(token, secret) {
    jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
