
const { ObjectId } = require('mongodb');
const User = require('../../db/user')
const Class = require('../../db/class')

const checkIsInClassMiddleware = (req, res) => {

    const uid = req.body.uid
    const cid = req.body.cid
    User.findById(ObjectId(uid), (err, data) => {
        if(err) throw err;
        else {
            if(ObjectId.isValid(cid)){
                if(data.classes.includes(ObjectId(cid))){
                    // console.log("case1")
                    // console.log("Valid CID? TRUE")
                    // console.log("ENROLLED? TRUE")
                    res.json({
                        inclass:true,
                        valid: true,
                        cid: cid
                    })
                } else {
                    if(data.classes.length === 0){
                        // console.log("case2")
                        // console.log("Valid CID? TRUE")
                        // console.log("ENROLLED? FALSE")
                        res.json({
                            inclass: false,
                            enrolled: false,
                            valid: true
                        })
                    } else {
                        // console.log("case3")
                        // console.log("Valid CID? TRUE")
                        // console.log("ENROLLED? TRUE")
                        res.json({
                            inclass: false,
                            cid:data.classes[0],
                            enrolled: true,
                            valid: true
                        })
                    }
                    
                }
            } else {
                if(data.classes.length === 0){
                    // console.log("case4")
                    // console.log("Valid CID? FALSE")
                    // console.log("ENROLLED? FALSE")
                    res.json({
                        inclass: false,
                        enrolled : false,
                        valid: false
                    })
                } else {
                    // console.log("case5")
                    // console.log("Valid CID? FALSE")
                    // console.log("ENROLLED? TRUE")
                    res.json({
                        inclass: false,
                        cid: data.classes[0],
                        enrolled: true,
                        valid: false
                    })
                }
                
            }
            
        }
    })
}

module.exports = checkIsInClassMiddleware;