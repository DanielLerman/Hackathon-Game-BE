const { signupSchema } = require("../validation/schemas");
const compileValidationSchema = require("../validation/compileValidationSchema");
const hash = require("../../lib/bcrypt");
const checkDBForExistingEmail = require("../../models/users/checkDBForExistingEmail");

function validateSignup(req, res, next) {
    const validate = compileValidationSchema(signupSchema);
    const isValid = validate(req.body);
    if (isValid) return next();
    const err = new Error("Signup data submitted is invalid.");
    err.statusCode = 400;
    return next(err);
}

function doPasswordsMatch(req, res, next) {
    const password = req.body.password;
    const repassword = req.body.repassword;
    if (password === repassword) return next();
    const err = new Error("Passwords do not match.");
    err.statusCode = 400;
    return next(err);
}

async function isEmailUnique(req, res, next) {
    try {
        const areUnique = await checkDBForExistingEmail(
            req.body.email,
            req.body.nickname
        );
        if (areUnique) return next();
        const err = new Error(
            "There is already a user with that email address."
        );
        err.statusCode = 400;
        return next(err);
    } catch (err) {
        err.statusCode = 500;
        err.message = "There was an error looking up the user in the database.";
        return next(err);
    }
}

function hashPassword(req, res, next) {
    const hashedPassword = hash(req.body.password, 10);
    req.password = hashedPassword;
    next();
}

module.exports = {
    validateSignup,
    doPasswordsMatch,
    isEmailUnique,
    hashPassword,
};
