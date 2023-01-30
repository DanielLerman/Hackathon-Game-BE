function signupUser(req, res, next) {
    const signupSuccess = addUserToDB(req.body);
    if (signupSuccess) return res.send({ ok: true });
    const err = new Error();
    err.statusCode = 500;
    err.message = "There was a problem signing you up.";
    return next(err);
}

module.exports = signupUser;
