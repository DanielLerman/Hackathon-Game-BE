const { loginSchema } = require("../validation/schemas");
const compileValidationSchema = require("../validation/compileValidationSchema");
const hash = require("../../lib/bcrypt");
const signToken = require("../../lib/jwt");
const checkDBForMatchingEmailAndPassword = require("../../models/users/checkDBForMatchingEmailAndPassword");

function validateLogin(req, res, next) {
    const validate = compileValidationSchema(loginSchema);
    const isValid = validate(req.body);
    if (isValid) return next();
    const err = new Error();
    err.statusCode = 400;
    err.message = "Login data submitted is invalid.";
    return next(err);
}

function hashPassword(req, res, next) {
    const hashedPassword = hash(req.body.password, 10);
    req.password = hashedPassword;
    next();
}

async function authenticateAndGetUser(req, res, next) {
    try {
        const user = await checkDBForMatchingEmailAndPassword(
            req.body.email,
            req.body.password
        );
        if (user) {
            req.user = user;
            return next();
        }
        const err = new Error();
        err.statusCode = 400;
        err.message = "The email and/or password you entered is incorrect.";
        return next(err);
    } catch (err) {
        err.statusCode = 500;
        err.message = "There was an error looking up the user in the database.";
        return next(err);
    }
}

function generateCookie(req, res, next) {
    const token = signToken(
        req.user.id,
        req.user.firstName,
        process.env.TOKEN_SECRET
    );
    res.cookie("authToken", token, {
        maxAge: 86400000,
        httpOnly: true,
    });
    return next();
}

module.exports = {
    validateLogin,
    hashPassword,
    authenticateAndGetUser,
    generateCookie,
};
