const Qstem = require('../../db/qstem')
const Class = require('../../db/class');
const User = require('../../db/user');
const Option = require('../../db/option')
const ObjectId = require('mongodb').ObjectId




const createFullQuestionMiddleware = (req, res) => {
    /*
    logic
    - 불러올 것 : option List(어떤 index가 정답인지에 대한 정보), question Info(author, qstem HTML, qstem string, class), 
    - option들을 저장한다
    - option Set에 option id를 정답 option id와 함께 저장한다
    - qstem object를 만들어 qstem에 저장한다
    - class와 user info에 qstem을 push 해준다. 
    */

    const optionList = req.body.optionList
    const qinfo = req.body.qInfo
    const authorId = qinfo.author
    const cid = req.body.cid
    const explanation = req.body.explanation

    async function saveOptions(options) {
        const savedOptions = await Promise.all(options.map( async (o) => {
            const newOption = await new Option(o)
            const data = await newOption.save()
            return data._id
        }))

        qinfo["options"] = savedOptions
        qinfo["explanation"] = explanation
        
        const newQuestion = await new Qstem(qinfo)
        newQuestion.save((err, data) => {
            if(err) throw err;
            else {
                Class.findByIdAndUpdate(ObjectId(cid),{$push:{qstems:data._id}},(err, data2) => {
                    if(err) throw err;
                    else {
                        User.findByIdAndUpdate(ObjectId(authorId), {$push:{made:data._id}},(err, data3) => {
                            if(err) throw err;
                            else {
                                res.json({
                                    success:true,
                                    question:data
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    saveOptions(optionList)



}

module.exports = createFullQuestionMiddleware

