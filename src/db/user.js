var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        max: 32,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    imageUrl:{
        type: String,
        default:""
    },
    classes:{
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Class"
            }
        ]
    },
    madeStems:{
        type:[
            {
                type: mongoose.Schema.ObjectId,
                ref: "Qstem"
            }
        ],
        default:[]
    },
    madeOptions:{
        type:[
            {
                type: mongoose.Schema.ObjectId,
                ref: "Option"
            }
        ],
        default:[]
    }
})

module.exports = mongoose.model("User", userSchema);
