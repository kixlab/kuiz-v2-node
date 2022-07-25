var mongoose = require('mongoose')

const optionListSchema = new mongoose.Schema({
    alternatives:{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:"Option"
        }]
    },
    is_answer:{
        type: Boolean
    },
    class:{
        type: mongoose.Schema.ObjectId,
        ref:"Class"
    }
})

module.exports = mongoose.model("OptionList", optionListSchema)