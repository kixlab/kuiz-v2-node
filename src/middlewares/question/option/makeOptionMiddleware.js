const Option = require('../../../db/option')
const Qstem = require('../../../db/qstem')
const User = require('../../../db/user')
const {ObjectId} = require('mongodb')

const makeOptionMiddleware = (req, res) => {
    const optionData = req.body.optionData
    const option = new Option(optionData)

    option.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:"err in saving option"
            })
        } else {
            Qstem.findByIdAndUpdate(optionData.qstem, {$push: {options:data._id}}, (err, data2) => {
                if(err) throw err;
                else {
                    User.findByIdAndUpdate(data.author,{$push:{madeOptions:data._id}},(err, data3) => {
                        if(err) throw err
                        else {
                            res.json({
                                msg: "Saved Option",
                                success: true,
                                option:data
                            })
                        }
                    })
                }
            })
        }
    })
}



module.exports = makeOptionMiddleware