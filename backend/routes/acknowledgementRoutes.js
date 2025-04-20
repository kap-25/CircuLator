// Acknowledgement management routes

const express = require("express");
const router = express.Router();
const acknowledgementController = require("../controllers/acknowledgementController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, acknowledgementController.getAllAcknowledgements);
router.post("/", authMiddleware, acknowledgementController.acknowledgeCircular);
router.get("/by-circular/:circularId", authMiddleware, acknowledgementController.getAcknowledgementsByCircular);
router.get("/by-user/:email", authMiddleware, acknowledgementController.getAcknowledgementsByUser);

module.exports = router;