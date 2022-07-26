const Option = require('../../../db/option')
const Qstem = require('../../../db/qstem')
const { ObjectId } = require('mongodb');

const loadOptionsMiddleware = (req,res) => {
    const qid = req.data.qid
    Qstem.findById(ObjectId(qid),(err, data) => {
        if(err) {
            console.log("err msg:",err)
            return res.status(400).json({
                error:"err in loadOptionsMiddleware"
            })
        } else {
            Option.find({_id:{"$in":data.options}}).then((data2)=> {
                res.json({
                    options:data2,
                    success:true
                })
            })
            .catch((err) => console.log("ERR:",err))
        }
    })
}

module.exports = loadOptionsMiddleware