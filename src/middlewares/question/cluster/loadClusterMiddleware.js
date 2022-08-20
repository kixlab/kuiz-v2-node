const OptionCluster = require('../../../db/optionCluster')
const Option = require('../../../db/option')
const Qstem = require("../../../db/qstem")
const ObjectId = require('mongodb').ObjectId

const loadClusterMiddleware = (req, res) => {
    const qid = req.query.qid;

    OptionCluster.find({qstem:ObjectId(qid)},async (err, data) => {
        if(err) throw err;
        else {
            Option.find({_id:{$in:data.map(c => c)}})
        }
        res.json({
            cluster:data,
            success:true
        })
    })

}

module.exports = loadClusterMiddleware