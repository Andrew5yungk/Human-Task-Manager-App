const mongoose = require('mongoose')

const HTMSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
})

const HTMModel = mongoose.model("HTMCluster", HTMSchema)

module.exports = HTMModel
