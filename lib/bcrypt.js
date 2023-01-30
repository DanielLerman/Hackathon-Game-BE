const bcrypt = require("bcrypt");

function hash(plaintext, saltRounds) {
    return bcrypt.hashSync(plaintext, saltRounds);
}

module.exports = hash;
