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
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model("Qstem", qstemSchema);

