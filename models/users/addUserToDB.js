const User = require("../../Schema/UserSchema");

async function addUserToDB(email, password) {
    try {
        const doc = await User.create({email, password});
        console.log(doc);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = addUserToDB;
