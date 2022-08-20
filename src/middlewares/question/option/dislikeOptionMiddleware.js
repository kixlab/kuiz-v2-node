var Option = require('../../../db/option')
var OptionCluster = require('../../../db/optionCluster')
var ObjectId = require('mongodb').ObjectId

const dislikeOptionMiddleware = (req, res) => {

    const oid = req.body.oid
    const isAns = req.body.isAns
    const uid = req.body.uid

    const removeValue = (arr, elem) => {
        if(arr.includes(elem)){
            arr.splice(arr.indexOf(elem), 1)
        }
        return arr;
    }
    Option.findById(ObjectId(oid), (err, data) => {
        if(err) throw err;
        else {
            const ocid = data.cluster[0]
            const newLiked = removeValue(data.liked, ObjectId(uid))
            Option.findByIdAndUpdate(ObjectId(oid),{$set:{liked:newLiked}}, {new: true} ,(err, data) => {
                if(err) throw err;
                else {
                    if(isAns) {
                        OptionCluster.findById(ObjectId(ocid),(err, data2) => {
                            if(err) throw err;
                            Option.find({_id:{$in:data2.disList}}, (err, data3) => {
                                if(err) throw err;
                                const options = data3
                                const likes = options.map( o => o.liked.length)
                                const maxOpt = options[likes.indexOf(Math.max(...likes))]
                                OptionCluster.findByIdAndUpdate(ObjectId(ocid), {$set:{disRep:maxOpt}},{new:true},(err, data4) => {
                                    if(err) throw err;
                                    else {
                                        res.json({
                                            success: true,
                                            newRep: data4
                                        })
                                    }
                                })
                            })
                        })
                    } else {
                        OptionCluster.findById(ObjectId(ocid),(err, data2) => {
                            if(err) throw err;
                            Option.find({_id:{$in:data2.disList}}, (err, data3) => {
                                if(err) throw err;
                                const options = data3
                                const likes = options.map( o => o.liked.length)
                                const maxOpt = options[likes.indexOf(Math.max(...likes))]
                                OptionCluster.findByIdAndUpdate(ObjectId(ocid), {$set:{disRep:maxOpt}},{new:true},(err, data4) => {
                                    if(err) throw err;
                                    else {
                                        res.json({
                                            success: true,
                                            newRep: data4
                                        })
                                    }
                                })
                            })
                        })
                    }
                    
                }
            })
        }
    })

    
 }

module.exports = dislikeOptionMiddleware