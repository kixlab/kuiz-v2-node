const User = require('../../db/user')
const {ObjectId} = require('mongodb')

const loadSolvedMiddleware = (req, res) => {

    const uid = req.body.uid
    User.findById(ObjectId(uid),(err, data) => {
        questions = data.solved
        qids = data.solved.map(s => question)
    })
}

module.exports = loadSolvedMiddleware