// Circulars (CRUD operations)

const Circular = require("../models/circularModel");

// Create Circular
exports.createCircular = async (req, res) => {
    try {
        const { title, content, created_by, created_at } = req.body;
        
        const newCircular = new Circular({
            title,
            content,
            created_by: req.user.name || req.user.email || req.user.id,
        });

        await newCircular.save();
        res.status(201).json({
            message: "Circular created successfully",
            circular: newCircular
        });
    } catch (err) {
        console.error("Create circular error:", err);
        res.status(500).json({
            error: "Server error"
        });
    }
};

// Get All Circulars
exports.getAllCirculars = async (req, res) => {
    try {
        const circulars = await Circular.find();

        res.status(200).json(circulars);
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};

// Get Single Circular
exports.getCircularById = async (req, res) => {
    try {
        const circular = await Circular.findById(req.params.id);

        if (!circular) {
            return res.status(404).json({
                error: "Circular not found"

            });
        }
        res.status(200).json(circular);
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};

// Update Circular
exports.updateCircular = async (req, res) => {
    try {
        const { title, content, created_by, created_at } = req.body;

        const updatedCircular = await Circular.findByIdAndUpdate(
            req.params.id,
            { title, content, created_by, created_at },
            { new: true }
        );

        if (!updatedCircular) {
            return res.status(404).json({
                error: "Circular not found"
            });
        }
        res.status(200).json({
            message: "Circular updated",
            circular: updatedCircular
        });
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};

// Delete Circular
exports.deleteCircular = async (req, res) => {
    try {
        const deletedCircular = await Circular.findByIdAndDelete(req.params.id);

        if (!deletedCircular) {
            return res.status(404).json({
                error: "Circular not found"
            });
        }
        res.status(200).json({
            message: "Circular deleted"
        });
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};
