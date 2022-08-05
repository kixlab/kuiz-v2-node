const Option = require('../../../db/option')
const { ObjectId } = require('mongodb');

const loadOptionDetailMiddleware = (req,res) => {
    console.log("DATA:",req.query)
    const oid = req.query.oid
    Option.findById(ObjectId(oid),(err, data) => {
        if(err) {
            console.log("err msg:",err)
            return res.status(400).json({
                error:"err in loadOptionDetailMiddleware"
            })
        } else {
            res.json({
                optionDetail:data
            })
        }
    })

}

module.exports = loadOptionDetailMiddleware