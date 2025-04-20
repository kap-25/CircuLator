// Circular schema/model

const mongoose = require("mongoose");

const circularSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Circular = mongoose.model("Circular", circularSchema);

module.exports = Circular;