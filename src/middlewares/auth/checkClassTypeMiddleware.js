var Class = require('../../db/class')
var ObjectId = require('mongodb').ObjectId

const checkClassTypeMiddleware = (req, res) => {

    const cid = req.query.cid
    Class.findById(ObjectId(cid), (err, data) => {
        if(err) throw err;
        else {
            //TODO : data 비어있는 case handling(잘못된 주소일 경우)
            res.json({
                cType: data.classType
            })
        }
    })

}

module.exports = checkClassTypeMiddleware