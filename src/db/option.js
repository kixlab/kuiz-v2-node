var mongoose = require("mongoose")
const { options } = require("nodemon/lib/config")

const optionSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    option_text:{
        type: String,
        required: true,
        trim: true
    },
    explanation:{
        type: String,
        trim: true
    },
    likes:{
        type: Int
    },
    is_answer:{
        type: Boolean,
        required: true
    },
    class: {
        type: mongoose.Schema.ObjectId,
        ref:"Class"
    }
})

module.exports = mongoose.model("Option", optionSchema)