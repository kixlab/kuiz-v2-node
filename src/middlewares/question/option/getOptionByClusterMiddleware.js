const OptionCluster = require('../../../db/optionCluster')
const Option = require('../../../db/option')
const ObjectId = require('mongodb').ObjectId

const getOptionByClusterMiddleware = (req, res) => {
    const clusterId = req.query.ocid
    OptionCluster.findById(ObjectId(clusterId),(err, data) => {
        if(err) throw err;
        else {
            Option.find({_id:{$in:data.ansList.map((o) => ObjectId(o))}}, (err, data2) => {
                Option.find({_id:{$in:data.disList.map((o)=> ObjectId(o))}}, (err, data3) => {
                    res.json({
                        success:true,
                        ansList:data2,
                        disList:data3
                    })
                })
            })
        }
    })
}

module.exports = getOptionByClusterMiddleware