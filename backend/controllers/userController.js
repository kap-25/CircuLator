// User-related logic (CRUD, authentication)

const User = require("../models/userModel");

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // exclude password

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};

// Get Single User
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // No passwords
        // const users = await User.find({}, "name email"); //No Passwords

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated",
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        res.status(200).json({
            message: "User deleted"
        });
    } catch (err) {
        res.status(500).json({
            error: "Server error"
        });
    }
};