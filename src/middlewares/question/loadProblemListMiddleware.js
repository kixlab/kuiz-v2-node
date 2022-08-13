const Qstem = require('../../db/qstem')
const Class = require('../../db/class')
const { ObjectId } = require('mongodb');


const loadProblemListMiddleware = (req,res) => {
    const classCode = req.query.cid
    console.log("classscode:",req.query.cid)
    Class.findById(ObjectId(classCode),(err,data) => {
        if(err){
            res.json({
                success:false,
                error:"undefined class code"
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