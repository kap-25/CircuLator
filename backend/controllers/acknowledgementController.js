// Acknowledgement-related logic
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Acknowledgement = require("../models/acknowledgementModel");

// Acknowledge Circular
exports.acknowledgeCircular = async (req, res) => {
  try {
    const { userId, circularId } = req.body;

    // Validate ObjectID format
    if (!mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(circularId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const existing = await Acknowledgement.findOne({
      user_id: userId,
      circular_id: circularId
    });

    if (existing) {
      return res.status(400).json({ message: "Already acknowledged" });
    }

    const ack = new Acknowledgement({
      user_id: userId,
      circular_id: circularId,
      received_at: new Date() // ✅ Corrected spelling
    });

    await ack.save();
    res.status(201).json({ message: "Acknowledged successfully" });
  } catch (error) {
    console.error("Acknowledgement error:", error);
    res.status(500).json({ error: "Failed to acknowledge" });
  }
};


// Get Acknowledgements by Circular
exports.getAcknowledgementsByCircular = async (req, res) => {
  try {
    const { circularId } = req.params;

    const acks = await Acknowledgement.find({ circular_id: circularId })
      .populate("user_id", "name email");

    res.status(200).json(acks);
  } catch (error) {
    console.error(`Fetch Acknowledgements Error: ${error}`);
    res.status(500).json({
      error: "Failed to retrieve acknowledgements"
    });
  }
};


// Get Acknowledgements by User
exports.getAcknowledgementsByUser = async (req, res) => {
  try {
    const { email } = req.params;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find acknowledgments by user ID
    const acks = await Acknowledgement.find({ user_id: user._id });
    res.status(200).json(acks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user acknowledgements" });
  }
};

// Get All Acknowledgements
exports.getAllAcknowledgements = async (req, res) => {
  try {
    const acks = await Acknowledgement.find()
      .populate("user_id", "email")
      .populate("circular_id", "title");
    // Transform data for frontend
    const result = acks.map(ack => ({
      userEmail: ack.user_id.email,
      circularTitle: ack.circular_id.title
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch acknowledgements" });
  }
};
