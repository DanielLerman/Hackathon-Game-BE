const jwt = require("jsonwebtoken");

function signToken(id, firstName, secret) {
    const token = jwt.sign({ id, firstName }, secret, {
        expiresIn: "1d",
    });
    return token;
}

function verifyToken(token, secret) {
    jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
