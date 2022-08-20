var Option = require('../../../db/option')
var OptionCluster = require('../../../db/optionCluster')
var ObjectId = require('mongodb').ObjectId

const likeOptionMiddleware = (req, res) => {

    const oid = req.body.oid
    const isAns = req.body.isAns
    const uid = req.body.uid

    const addValue = (arr, elem) => {
        arr = arr.concat([elem]).map(a => a.toString())
        return [...new Set(arr)].map(a => ObjectId(a))
        // arr1 = arr.map( a => a.toString())
        // console.log("SET1:", new Set(arr1))

        // // return arr.filter((a, index) => arr.indexOf(a) === index)
        // console.log("SET:",[...new Set(arr)])
        // return Array.from(new Set(arr));
    }
    Option.findById(ObjectId(oid), (err, data) => {
        if(err) throw err;
        else {
            const ocid = data.cluster[0]
            const newLiked = addValue(data.liked, ObjectId(uid))
            Option.findByIdAndUpdate(ObjectId(oid),{$set:{liked:newLiked}}, {new: true} ,(err, data) => {
                if(err) throw err;
                else {
                    if(isAns) {
                        OptionCluster.findById(ObjectId(ocid),(err, data2) => {
                            if(err) throw err;
                            Option.find({_id:{$in:data2.ansList}}, (err, data3) => {
                                if(err) throw err;
                                const options = data3
                                const likes = options.map( o => o.liked.length)
                                const maxOpt = options[likes.indexOf(Math.max(...likes))]
                                OptionCluster.findByIdAndUpdate(ObjectId(ocid), {$set:{ansRep:maxOpt}},{new:true},(err, data4) => {
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

module.exports = likeOptionMiddleware