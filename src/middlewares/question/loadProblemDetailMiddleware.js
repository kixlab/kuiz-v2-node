const Qstem = require('../../db/qstem')
const Option = require('../../db/option')
const OptionSet = require('../../db/optionSet')
const { ObjectId } = require('mongodb');

const { off } = require('../../db/user');

const loadProblemDetailMiddleware = (req,res) => {
    const qid = req.query.qid
    Qstem.findById(ObjectId(qid),(err, data) => {
        if(err) {
            console.log("err msg:",err)
            return res.status(400).json({
                error:"err in loadProblemDetailMiddleware"
            })
        } else {
            if (data.optionSets.length !=0) {
                const optionSet = data.optionSets[0]//TODO: draw optionset algorithm
                OptionSet.findById(ObjectId(optionSet)).then((data2) => {
                    Option.find({_id:{"$in":data2.options}}).then((data3) => {
                        res.json({
                            success:true,
                            data:{
                                qinfo: data,
                                options: data3
                            }
                        })
                    }).catch((err)=> console.log("ERR:",err))
                })
                
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