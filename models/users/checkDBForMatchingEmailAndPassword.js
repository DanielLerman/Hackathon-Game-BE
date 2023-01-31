const User = require("../../Schema/UserSchema");
const {compare} = require("../../lib/bcrypt");

async function checkDBForMatchingEmailAndPassword(email, password) {
    const user = await User.findOne({email: email});
    console.log(user);
    const passwordsMatch = compare(password, user.password);
    if (passwordsMatch) return {id: user.id};
    return false;
}

module.exports = checkDBForMatchingEmailAndPassword;
