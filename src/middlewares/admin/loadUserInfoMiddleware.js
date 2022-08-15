const User = require('../../db/user')
const Class = require('../../db/class')
const {ObjectId} = require('mongodb')
const { createDiffieHellman } = require('crypto')

const loadUserInfoMiddleware = (req,res) => {
    const cid = req.query.cid
    Class.findById(ObjectId(cid)).then((data) => {
        User.find({_id:{$in:data.students}}).then((data2) => {
            res.json({
                students: data2,
                success:true
            })
        }).catch((err) => {
            throw err;
        })
    }).catch((err) => {
        throw err;
    })
}
module.exports = loadUserInfoMiddleware