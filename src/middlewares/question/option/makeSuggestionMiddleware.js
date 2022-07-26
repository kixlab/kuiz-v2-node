const Option = require('../../../db/option')
const {ObjectId} = require('mongodb')

const makeSuggestionMiddleware = (req, res) => {
    const oid = req.body.oid
    const newSuggestion = req.body.newSug
    Option.updateOne({_id: ObjectId(oid)},{$push:{suggesetions:newSuggestion}},(err, data) => {
        if(err) throw err;
        else {
            res.json({
                success: true
            })
        }
    })
}

module.exports = makeSuggestionMiddleware