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
        type: Number
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
        type: Number,
        default:0
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
        type: [{
            type:SuggestionSchema
        }],
        default:[]
    },
    includedSet:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:"OptionSet"
        }],
        default:[]
    },
    plausible:{
        type: Object,
        default:{
            similar:[],
            difference:[]
        }
    },
    dependency:{
        type:Object,
        default:{
            same:[],
            contradictory:[]
        }
    },
    cluster:{
        type:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"OptionCluster"
            }
        ]
    }

})

module.exports = mongoose.model("Option", optionSchema)