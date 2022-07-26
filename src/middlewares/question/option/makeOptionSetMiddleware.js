const OptionSet = require('../../../db/optionSet')

const makeOptionSetMiddleware = (req, res) => {
    const optionSetData = req.body.optionSetData
    const optionSet = new OptionSet(optionSetData)

    optionSet.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:"err in saving optionSet"
            })
        }
    })
}

module.exports = makeOptionSetMiddleware