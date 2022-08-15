const User = require('../../../db/user')
const Qstem = require('../../../db/qstem')
const Option = require('../../../db/option')
const {ObjectId} = require('mongodb')

const loadCreatedOptionMiddleware = (req,res) => {
    const uid = req.body.uid
    User.findById(ObjectId(uid)).then(
        (data) => {
            Option.find({_id:{$in:data.madeOptions}}).then((data2) => {
                res.json({
                    madeOption:data2,
                    success:true
                })
            }).catch((err) => {
                throw err;
            })
        }
    ).catch((err) => {
        throw err;
    })

}
module.exports = loadCreatedOptionMiddleware