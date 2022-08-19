var Option = require('../../../db/option')

const loadOptionInClusterMiddleware = (req, res) => {
    const optionList = req.body.optionList

    Option.find({_id:{$in:optionList}},(err, data) => {
        if(err) throw err;
        else {
            res.json({
                success: true, 
                options: data
            })
        }
    })

}

module.exports = loadOptionInClusterMiddleware

