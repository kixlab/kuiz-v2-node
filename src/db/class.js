var mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    code:{
        type:String,
        default:"test101"
    },
    students:{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:"User"
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
