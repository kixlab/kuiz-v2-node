const Option = require('../../../db/option')
const {ObjectId} = require('mongodb')

const setOptionDependencyMiddleware = (req, res) => {
    const oid = req.body.oid
    const dependency = req.body.dependency
    Option.findByIdAndUpdate(ObjectId(oid),{dependency:dependency},(err, data) => {
        if(err) throw err;
        else {
            res.json({
                success:true
            })
        }
    })
}

module.exports = setOptionDependencyMiddleware