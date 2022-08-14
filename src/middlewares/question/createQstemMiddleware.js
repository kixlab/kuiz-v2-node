const Qstem = require('../../db/qstem')
const Class = require('../../db/class')
const User = require('../../db/user')
const { isObjectIdOrHexString } = require('mongoose')
const ObjectId = require('mongodb').ObjectId

const createQstemMiddleware = (req,res) => {
    var qstemObj = req.body.qstemObj
    var classCode = req.body.cid
    const qstem = new Qstem(qstemObj)

    const saveToClass = (data) => {
        if(data === null) {
            return res.json({msg:"No such class", success: false});
        } else {
            Class.updateOne({_id:ObjectId(classCode)}, {$push: {qstems:qstem._id}}, (err,data2) => { 
                if(err) throw err;
                else {
                    User.findByIdAndUpdate(qstem.author,{$push:{made:qstem._id}}, (err, data3) => {
                        if(err) throw err;
                        else {
                            res.json({
                                msg:"created question",
                                success: true,
                                data: qstem._id
                            })
                        }
                    })
                    
                }
            })
        }
    }

    qstem.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:"err in saving qstem"
            })
        }
        Class.findById(ObjectId(classCode))
        .then(saveToClass)
        .catch((err)=> {throw err});
    })

}

module.exports = createQstemMiddleware