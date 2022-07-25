var mongoose = require('mongoose')

var problemSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    stem:{
        type: mongoose.Schema.ObjectId,
        type: "Qstem"
    },
    optionSet:{
        type: mongoose.Schema.ObjectId,
        type: "OptionSet"
    },
    class:{
        type: mongoose.Schema.ObjectId,
        type: "Class"
    }
})

module.exports = mongoose.model("Problem", problemSchema);
