const { signupSchema } = require("../validation/schemas");
const compileValidationSchema = require("../validation/compileValidationSchema");
const hash = require("../../lib/bcrypt");
const checkDBForSameEmailAndNickname = require("../../models/users/checkDBForSameEmailAndNickname");

function validateSignup(req, res, next) {
    const validate = compileValidationSchema(signupSchema);
    const isValid = validate(req.body);
    if (isValid) return next();
    const err = new Error();
    err.statusCode = 400;
    err.message = "Signup data submitted is invalid.";
    return next(err);
}

function doPasswordsMatch(req, res, next) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password === confirmPassword) return next();
    const err = new Error();
    err.statusCode = 400;
    err.message = "Signup data submitted is invalid.";
    return next(err);
}

function areEmailAndNicknameUnique(req, res, next) {
    const areUnique = checkDBForSameEmailAndNickname(
        req.body.email,
        req.body.nickname
    );
    if (areUnique) return next();
    const err = new Error();
    err.statusCode = 400;
    err.message =
        "There is already a user with that email address and/or nickname.";
    return next(err);
}

function hashPassword(req, res, next) {
    const hashedPassword = hash(req.body.password, 10);
    req.password = hashedPassword;
    next();
}

module.exports = {
    validateSignup,
    doPasswordsMatch,
    areEmailAndNicknameUnique,
    hashPassword,
};
