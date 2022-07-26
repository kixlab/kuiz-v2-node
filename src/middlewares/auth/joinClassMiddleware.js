const { ObjectId } = require('mongodb');
const User = require('../../db/user')

const joinClassMiddleware = (req, res, next) => {
    const userEmail = req.body.userEmail;
    const code = req.body.code;
    const _id = req.body._id;

    const check = (data) => {
        if (data === null) {
            return res.json({ msg: "No such class", success: false });
        } else {
            if (code == data.code) {
                Class.updateOne({ code: code }, { $push: { students: ObjectId(_id) } }, (err, data2) => {
                    if (err) throw err;
                    else {
                        User.updateOne({ email: userEmail }, { $push: { classes: [code] } })
                            .then((data3) => {
                                res.json({
                                    msg: "Joined class",
                                    success: true
                                })
                            })
                            .catch((err) => { throw err; })
                    }
                })
            } else {
                res.json({
                    msg: "Failed to join group",
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
