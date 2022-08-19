var mongoose = require("mongoose")

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
    }

})
const optionClusterSchema = new mongoose.Schema({
    ansList:{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:"Option"
        }]
    },
    disList:{
        type:[{
            type: mongoose.Schema.ObjectId,
            ref:"Option"
        }]
    },
    ansExist:{
        type:Boolean,
        default:false
    },
    disExist:{
        type:Boolean,
        default:false
    },
    qstem:{
        type:mongoose.Schema.ObjectId,
        ref:"Qstem"
    },
    ansRep:{
        type: optionSchema
    },
    disRep:{
        type:optionSchema
    }
})

module.exports = mongoose.model("OptionCluster", optionClusterSchema)