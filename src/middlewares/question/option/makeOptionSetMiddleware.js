const Option = require('../../../db/option')
const OptionSet = require('../../../db/optionSet')

const makeOptionSetMiddleware = (req, res) => {
    const optionSetData = req.data.optionSetData
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