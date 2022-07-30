const OptionSet = require('../../../db/optionSet')
const Option = require('../../../db/option')

const makeOptionSetMiddleware = (req, res) => {
    const optionSetData = req.body.optionSetData
    const optionSet = new OptionSet(optionSetData)

    optionSet.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:"err in saving optionSet"
            })
        } else {
            Option.updateMany({_id:{"$in":optionSet.options}},{$push:{includedSet:optionSet._id}}).catch((err)=> console.log("ERR:",err))
        }
    })
}

module.exports = makeOptionSetMiddleware