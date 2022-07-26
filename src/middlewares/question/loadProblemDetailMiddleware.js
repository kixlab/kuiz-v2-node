const Qstem = require('../../db/qstem')
const Option = require('../../db/option')
const { ObjectId } = require('mongodb');
const { off } = require('../../db/user');

const loadProblemDetailMiddleware = (req,res) => {
    const qid = req.data.qid
    Qstem.findById(ObjectId(qid),(err, data) => {
        if(err) {
            console.log("err msg:",err)
            return res.status(400).json({
                error:"err in loadProblemDetailMiddleware"
            })
        } else {
            if (optionSets.length !=0) {
                const optionSet = data.optionSets[0]
            } else {

            }
             
        }
    })

}

module.exports = loadProblemDetailMiddleware