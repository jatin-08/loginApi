const mongoose = require("mongoose");

// Creating a Schema
const uploadFileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, "File Name is Required"]
    },
    filepath: {
        type: String,
        required: [true, "File Path is required"]
    }
}, {
    timestamps: true
}
)

// "upload is a Collection Name"
module.exports = mongoose.model("Upload", uploadFileSchema); // Exporting model 