const Option = require('../../../db/option')
const Qstem = require('../../../db/qstem')
const { ObjectId } = require('mongodb');

const loadOptionsMiddleware = (req,res) => {
    /* IF WANT TO LOAD BY OPTION._ID LIST
    const oidList = req.body.oidList
    Option.find({_id:{"$in":oidList}},(err,data)=>{
        if(err){
            return res.status(400).json({
                error:"err in loadOptionsMiddleware"
            })
        } else {
            res.json({
                success:true,
                options:data
            })
        }
    })
    */
    // console.log("QUERY:",req.query)
    const qid = req.query.qid
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
                    success:true,
                    qinfo:data
                })
            })
            .catch((err) => console.log("ERR:",err))
        }
    })
}

module.exports = loadOptionsMiddleware