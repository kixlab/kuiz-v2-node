const Option = require('../../../db/option')
const Qstem = require('../../../db/qstem')
const {ObjectId} = require('mongodb')

const makeOptionMiddleware = (req, res) => {
    const optionData = req.data.optionData
    const option = new Option(optionData)

    const saveOptiontoStem = (data) => {
        Qstem.updateOne({_id:ObjectId(data.qid)}, {$push: {options:option._id}}, (err, data2) => {
            if(err) throw err;
            else {
                res.jso({
                    msg: "Saved Option",
                    success: true
                })
            }
        })
    }

    option.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:"err in saving option"
            })
        } 
        Qstem.findById({_id:ObjectId(optionData.qstem)})
        .then(saveOptiontoStem)
        .catch((err) => {throw err})
    })
}



module.exports = makeOptionMiddleware