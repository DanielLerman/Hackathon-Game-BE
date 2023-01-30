const addScoreToDB = require("../models/scores/addScoreToDB");
const getAllUsersScoresFromDB = require("../models/scores/getAllUsersScoresFromDB");
const getLoggedInUsersScoresFromDB = require("../models/scores/getLoggedInUsersScoresFromDB");

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
        const scores = await getAllUsersScoresFromDB();
        if (scores) return res.send({ scores });
        throw new Error(
            "There was a problem getting users' scores from the database."
        );
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
}

async function getLoggedInUsersScores(req, res, next) {
    try {
        const scores = await getLoggedInUsersScoresFromDB(req.auth.id);
        if (scores) {
            const type = req.originalUrl.split("/")[1];
            switch (type) {
                case "last":
                    return res.send({ lastScore: scores[scores.length - 1] });
                case "high":
                    return res.send({ highScore: Math.max(...scores) });
                default:
                    return res.send({ allScores: scores });
            }
        }
        throw new Error(
            "There was a problem getting your scores from the database."
        );
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
}

module.exports = { addScore, getAllUsersScores, getLoggedInUsersScores };
