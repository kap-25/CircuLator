// Acknowledgment schema/model

const mongoose = require("mongoose");

const acknowledgementSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    circular_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circular",
      required: true,
    },
    received_at: {
      type: Date,
      default: Date.now,
    },
  });
  

const Acknowledgement = mongoose.model("Acknowledgement", acknowledgementSchema);

module.exports = Acknowledgement;