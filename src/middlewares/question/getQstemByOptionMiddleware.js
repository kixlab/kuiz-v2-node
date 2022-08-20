var Qstem = require('../../db/qstem')
var ObjectId = require('mongodb').ObjectId

const getQstemByOptionMiddleware = async (req, res) => {

    const qstems = req.body.qstems.map(q => ObjectId(q))
    const details  = await Promise.all(qstems.map(async qstem => {
        return await Qstem.findById(qstem)
    }))

    res.json({
        qstems:details
    })


}

module.exports=getQstemByOptionMiddleware