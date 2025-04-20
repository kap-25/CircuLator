// Circular management routes

const express = require("express");
const router = express.Router();
const circularController = require("../controllers/circularController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("admin"), circularController.createCircular);
router.get("/", circularController.getAllCirculars);
router.get("/:id", circularController.getCircularById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), circularController.updateCircular);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), circularController.deleteCircular);

module.exports = router;