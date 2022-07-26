const Qstem = require('../../db/qstem')
const Class = require('../../db/class')

const loadProblemListMiddleware = (req,res) => {
    const classCode = "test101"
    Class.findOne({code:classCode},(err,data)=>{
        if(err){
            console.log("err msg:",err)
            return res.status(400).json({
                error:"err in loadProblemListMiddleware"
            })
        }
        else {
            Qstem.find({_id:{"$in":data.qstems}}).then((data2)=>{
                res.json({
                    qstems:{problemList:data2, success: true, msg:"sucess"}
                })
            })
            .catch((err) => console.log("ERR:",err))
        }
    })
}

module.exports = loadProblemListMiddleware