const mongoose = require("mongoose");

const counterModelSchema = new mongoose.Schema({
    id: {
        type: String
    },
    seqId: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Counter", counterModelSchema);