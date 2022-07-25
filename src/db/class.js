var mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    code:{
        type:String,
        default:"test101"
    },
    participants:{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:"User"
        }]
    },
    problems:{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:"Problem"
        }]
    },
    qstems:{
       type:[{
           type: mongoose.Schema.ObjectId,
           ref:"Qstem"
       }] 
    }
})

module.exports = mongoose.model("Class", classSchema);
