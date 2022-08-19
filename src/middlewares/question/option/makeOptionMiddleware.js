const Option = require('../../../db/option')
const Qstem = require('../../../db/qstem')
const User = require('../../../db/user')
const OptionCluster = require('../../../db/optionCluster')
const {ObjectId} = require('mongodb')

const makeOptionMiddleware = (req, res) => {
    const optionData = req.body.optionData
    const option = new Option(optionData)

    option.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:"err in saving option"
            })
        } else {
            const ansList = option.ansList
            const disList = option.disList
            if(option.is_answer) {
                ansList = ansList.concat([option])
            } else {
                disList = disList.concat([Option])
            }
            const optionCluster = new OptionCluster({ansList:ansList, disList:disList, qstem:option.qstem, ansExist:(ansList.length!==0), disExist:(disList.length!==0)})
            optionCluster.save(async (err, data2) => {
                // await option.ansList.concat(option.disList).map( async (o) => {
                //     await Option.findByIdAndDelete(ObjectId(o))
                // })
                const listOfOid = option.ansList.concat(option.disList).map(o => ObjectId(o))
                OptionCluster.deleteMany({_id:{$in:listOfOid}},(err, data3) => {
                    // Option.updateMany({option._id}, {cluster:data2._id}, (err, data3) => {
                    //     Qstem.findByIdAndUpdate(optionData.qstem, {$push:{options: data._id}}, {$push:{cluster:data2._id}}, (err, data4) => { //TODO: push 동시에 두 field 되는지 check
                    //         if (err) throw err;
                    //         else {
                    //             User.findByIdAndUpdate(data.author,{$push:{madeOptions:data._id}}, (err, data5) => {
                    //                 if(err) throw err;
                    //                 else {
                    //                     res.json({
                    //                         msg: "Saved Option",
                    //                         success:true, 
                    //                         option:data
                    //                     })
                    //                 }
                    //             })
                    //         }
                    //     })
                    // })
                })
                
            })
        }
    })
}



module.exports = makeOptionMiddleware