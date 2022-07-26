const Option = require('../../../db/option')
const Qstem = require('../../../db/qstem')
const { ObjectId } = require('mongodb');

const loadOptionsMiddleware = (req,res) => {
    const qid = req.data.qid
    Qstem.findById(ObjectId(qid),(err, data) => {
        if(err) {
            
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