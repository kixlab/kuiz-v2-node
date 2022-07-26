var mongoose = require('mongoose')

const qstemSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    stem_text:{
        type: String,
        required: true
    },
    action_verb:{
        type: [String],
        default: []
    },
    keyword: {
        type: [String],
        default:[]
    },
    material: {
        type: String
    },
    class: {
        type: mongoose.Schema.ObjectId,
        ref:"Class"
    },
    options: {
        type: mongoose.Schema.ObjectId,
        ref:"Option"
    },
    optionSets:{
        type: [{
            type: mongoose.Schema.ObjectId,
            ref:"OptionSet"
        }]
    }
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model("Qstem", qstemSchema);

