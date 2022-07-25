const Qstem = require('../../db/qstem')
const Class = require('../../db/class')
const User = require('../../db/user')

const createQstemMiddleware = (req,res) => {
    var qstemObj = req.data.qstemObj
    var classCode = "test101"
    const qstem = new Qstem(qstem)

    const saveToClass = (data) => {
        if(data === null) {
            return res.json({msg:"No such class", success: false});
        } else {
            if(classCode == data.code) {
                Class.updateOne({code:classCode}, {$push: {qstems:qstem._id}}, (err,data2) => { // TODO: array push 해야하는지 element wise push 해야하는지 확인해보기]
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
        }
    }

    qstem.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:"err in saving qstem"
            })
        }
        Class.findOne({code:classCode})
        .then(saveToClass)
        .catch((err)=> {throw err});
    })

}

module.exports = createQstemMiddleware