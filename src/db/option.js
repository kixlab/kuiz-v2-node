var mongoose = require("mongoose")
const { options } = require("nodemon/lib/config")

const SuggestionSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    suggestion_text :{
        type: String
    },
    likes:{
        type: Int
    }
})
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
    },
    qstem:{
        type: mongoose.Schema.ObjectId,
        ref:"Qstem"
    },
    suggesetions:{
        type: SuggestionSchema
    }

})

module.exports = mongoose.model("Option", optionSchema)