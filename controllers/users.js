const addUserToDB = require("../models/users/addUserToDB");

async function signupUser(req, res, next) {
    try {
        const { firstName, lastName, nickname, email, password } = req.body;
        const signupSuccess = await addUserToDB(
            firstName,
            lastName,
            nickname,
            email,
            password
        );
        if (signupSuccess) return res.status(201).send({ ok: true });
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
