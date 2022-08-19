const Option = require('../../../db/option')
const Qstem = require('../../../db/qstem')
const User = require('../../../db/user')
const OptionCluster = require('../../../db/optionCluster')
const {ObjectId} = require('mongodb')

const makeOptionMiddleware2 = (req, res) => {
    const optionData = req.body.optionData // option object
    const dependentClusters = optionData.cluster // list of optionCluster

    const option = new Option(optionData)

    // 1. save new option to option collection
    // 2. make new OptionCluster 
    // 3. if required, delete previous OptionCluster
    // 4. update OptionCluster id of relevant dataset
        // 4.1 option
            // update previous optionCluster
        // 4.2 qstem
    // 5. update option list for qstem data
    // 6. update made option list for user data

    option.save(async (err, data) => {
        if(err) throw err;
        else {  
            let newAnsList = []
            let newDisList = []
            let newAnsRep = null
            let newDisRep = null
            // dependentClusters.forEach((cluster) => {
            //     newAnsList = newAnsList.concat(cluster.ansList)
            //     newDisList = newDisList.concat(cluster.disList)
            // })

            for (var i = 0; i<dependentClusters.length; i++){
                newAnsList = newAnsList.concat(dependentClusters[i].ansList)
                newDisList = newDisList.concat(dependentClusters[i].disList)
            }

            if(option.is_answer){
                newAnsRep = data
                if(newDisList.length !== 0){
                    newDisRep = await Option.findById(ObjectId(newDisList[0]))
                }
            } else {
                newDisRep = data
                if(newAnsList.length !== 0){
                    newAnsRep = await Option.findOne({_id:ObjectId(newAnsList[0])})
                }
            }


            const optionCluster = new OptionCluster({
                ansList : newAnsList,
                disList : newDisList,
                qstem: option.qstem,
                ansExist: newAnsList.length !==0,
                disExist: newDisList.length!==0,
                ansRep: newAnsRep,
                disRep: newDisRep
            })

            optionCluster.save((err, data2) => {
                if(err) throw err;
                else {
                    OptionCluster.deleteMany({_id:{$in:dependentClusters.map(c => c._id)}},(err, data3) => {
                        if(err) throw err;
                        // 새로운 clutser의 option 
                        const optionList = newAnsList.concat(newDisList)
                        Option.updateMany({_id:{$in:optionList}},{cluster:data2._id},(err, data4) => {
                            if(err) throw err;
                            Qstem.findByIdAndUpdate(option.qstem,{$push:{options:data._id}},{$push:{cluster:data2._id}},(err, data5) => {
                                if(err) throw errl
                                User.findByIdAndUpdate(option.author,{$push:{madeOptions:data._id}},(err, data6) => {
                                    if(err) throw err;
                                    else {
                                        res.json({
                                            success:true,
                                            msg:"Saved Option!",
                                            option:data
                                        })
                                    }
                                })
                            })
                        })
                    })
                }
            })
        }
    })

}



module.exports = makeOptionMiddleware2