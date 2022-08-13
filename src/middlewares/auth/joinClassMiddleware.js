const { ObjectId } = require('mongodb');
const User = require('../../db/user')
const Class = require('../../db/class')

const joinClassMiddleware = (req, res, next) => {
    const userEmail = req.body.userEmail;
    const code = req.body.code;
    const _id = req.body._id;

    const check = (data) => {
        if (data === null) {
            return res.json({ msg: "No such class", success: false });
        } else {
            if (code == data.code) {
                console.log("ID:",_id)
                console.log("Email:",userEmail)
                Class.findOneAndUpdate({ code: code }, { $push: { students: ObjectId(_id) } }, (err, data2) => {
                    
                    if (err) throw err;
                    else {
                        User.findOneAndUpdate({ _id: ObjectId(_id) }, { $push: { classes: data2._id } })
                            .then((data3) => {
                                console.log("data3::",data3)
                                res.json({
                                    msg: "Joined class",
                                    success: true,
                                    cid:data2._id
                                })
                            })
                            .catch((err) => { throw err; })
                    }
                })
            } else {
                res.json({
                    msg: "Entered invalid class code",
                    success: false
                })
            }
        }
    }

    Class.findOne({ code: code})
        .then(check)
        .catch((err) => { throw err });
}

module.exports = joinClassMiddleware;
