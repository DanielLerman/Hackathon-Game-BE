async function signupUser(req, res, next) {
    try {
        const signupSuccess = await addUserToDB(req.body);
        if (signupSuccess) return res.send({ ok: true });
        throw new Error("There was a problem signing you up.");
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
}

function loginUser(req, res) {
    res.send({
        ok: true,
        user: { id: req.user.id, firstName: req.user.firstName },
    });
}

module.exports = { signupUser, loginUser };
