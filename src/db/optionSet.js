var mongoose = require("mongoose")

const optionSetSchema = new mongoose.Schema({
    options:{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:"Option"
        }]
    },
    qstem:{
        type: mongoose.Schema.ObjectId,
        ref:"Qstem"
    },
    class:{
        type: mongoose.Schema.ObjectId,
        ref:"Class"
    },
    answer:{
        type: mongoose.Schema.ObjectId,
        ref:"Option"
    }
})

module.exports = mongoose.model("OptionSet", optionSetSchema)