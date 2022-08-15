const User = require('../../db/user')
const Qstem = require('../../db/qstem')
const {ObjectId} = require('mongodb')

const loadCreatedStemDataMiddleware = (req,res) => {

    const uid = req.body.uid
    console.log("UIDL",req.body)
    User.findById(ObjectId(uid)).then(
        (data) => {
            console.log("Data:",data.made)
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