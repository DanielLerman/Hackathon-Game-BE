const User = require("../../Schema/UserSchema");

async function checkDBForExistingEmail(email) {
    const exists = await User.findOne({email: email});
    if (exists) return false;
    return true;
}

module.exports = checkDBForExistingEmail;
