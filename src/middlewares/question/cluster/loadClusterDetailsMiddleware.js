var OptionCluster = require('../../../db/optionCluster')


const loadClusterDetailsMiddleware = (req, res) => {
    const clusters = req.body.clusters

    OptionCluster.find({_id:{$in:clusters}}, (err, data) => {
        if(err) throw err;
        res.json({
            clusters:data,
            success: true
        })
    })
}

module.exports = loadClusterDetailsMiddleware