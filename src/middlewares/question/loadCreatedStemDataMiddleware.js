const User = require('../../db/user')
const Qstem = require('../../db/qstem')
const {ObjectId} = require('mongodb')

const loadCreatedStemDataMiddleware = (req,res) => {

    const uid = req.body.uid
    User.findById(ObjectId(uid)).then(
        (data) => {
            Qstem.find({_id:{$in:data.made}}).then((data2) => {
                res.json({
                    madeStem:data2,
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
module.exports = loadCreatedStemDataMiddleware