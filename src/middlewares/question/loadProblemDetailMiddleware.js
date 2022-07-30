const Qstem = require('../../db/qstem')
const Option = require('../../db/option')
const { ObjectId } = require('mongodb');
const { off } = require('../../db/user');

const loadProblemDetailMiddleware = (req,res) => {
    const qid = req.param.qid
    Qstem.findById(ObjectId(qid),(err, data) => {
        if(err) {
            console.log("err msg:",err)
            return res.status(400).json({
                error:"err in loadProblemDetailMiddleware"
            })
        } else {
            if (optionSets.length !=0) {
                const optionSet = data.optionSets[0]//TODO: draw optionset algorithm
                Option.find({_id:{"$in":optionSet}}).then((data2) => {
                    res.json({
                        success:true,
                        data:{
                            qinfo: data,
                            options: data2
                        }
                    })
                }).catch((err)=> console.log("ERR:",err))
            } else {
                res.json({
                    success:false,
                    msg:"no option set",
                    data:{}
                })
            }
             
        }
    })

}

module.exports = loadProblemDetailMiddleware