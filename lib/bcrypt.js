const bcrypt = require("bcrypt");

function hash(plaintext, saltRounds) {
    return bcrypt.hashSync(plaintext, saltRounds);
}

function compare(plaintext, hash) {
    return bcrypt.compareSync(plaintext, hash);
}
module.exports = {hash, compare};
