var Qstem = require('../../db/qstem')
var ObjectId = require('mongodb').ObjectId

const getQstemByOptionMiddleware = (req, res) => {

    const qstems = req.body.qstems.map(q => ObjectId(q))
    Qstem.find({_id:{$in:qstems}},(err, data) => {
        if(err) throw err;
        else {
            res.json({
                qstems:data
            })
        }
    })

}

module.exports=getQstemByOptionMiddleware