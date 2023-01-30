const { verifyToken } = require("../../lib/jwt");

function protectedToAnyUser(req, res, next) {
    const pass = verifyToken(req.cookies.authToken, process.env.TOKEN_SECRET);
    if (pass) return next();
    const err = new Error("You must be logged in to view this information.");
    err.statusCode = 401;
    return next(err);
}

function protectedToLoggedInUserOnly(req, res, next) {
    const payload = verifyToken(
        req.cookies.authToken,
        process.env.TOKEN_SECRET
    );
    if (!payload) {
        const err = new Error("You must be logged in to view your scores.");
        err.statusCode = 401;
        return next(err);
    }
    if (req.params.id == payload.id) return next();
    const err = new Error("You can only view your own scores.");
    err.statusCode = 403;
    return next(err);
}

module.exports = { protectedToAnyUser, protectedToLoggedInUserOnly };
