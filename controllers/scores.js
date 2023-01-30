const addScoreToDB = require("../models/scores/addScoreToDB");
const getAllUsersScoresFromDB = require("../models/scores/getAllUsersScoresFromDB");

async function addScore(req, res, next) {
    try {
        const { email, score } = req.body;
        const now = new Date();
        const todaysDate = now.toLocaleDateString();
        const addScoreSuccess = await addScoreToDB(email, score, todaysDate);
        if (addScoreSuccess) return res.status(201).send({ ok: true });
        throw new Error(
            "There was a problem adding the score to the database."
        );
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
}

async function getAllUsersScores(req, res, next) {
    try {
        const allUsersScores = await getAllUsersScoresFromDB();
        if (allUsersScores) return res.send({ scores: allUsersScores });
        throw new Error(
            "There was a problem getting users' scores from the database."
        );
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
}

module.exports = { addScore, getAllUsersScores };
