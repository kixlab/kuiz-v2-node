const Problem = require('../../db/problem')
const Class = require('../../db/class')

const loadProblemListMiddleware = (req,res) => {
    const classCode = "test101"
    Class.findOne({code:classCode},(err,data)=>{
        if(err){
            console.log("err msg:",err)
            return res.status(400).json({
                error:"err"
            })
        }
        else {
            Problem.find({_id:{"$in":data.problems}}).then((data)=>{
                res.json({
                    problems:{problemList:data, success: true, msg:"sucess"}
                })
            })
            .catch((err) => console.log("ERR:",err))
        }
    })
}

module.exports = loadProblemListMiddleware