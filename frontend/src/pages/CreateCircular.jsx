// Form for creating circulars (admin)

import React, { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CreateCircular = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            return setError("All fields are required.");
        }

        try {
            // Assume the backend sets created_by and created_at automatically
            const response = await axios.post("/circulars", formData);
            setSuccess("Circular created successfully!");
            setError("");

            setTimeout(() => navigate("/admin"), 1500); // Redirect after success
        } catch (err) {
            console.error("Create failed:", err);
            setError("Failed to create circular.");
        }
    };

    return (
        <div className="create-circular-page">
            <h2>Create New Circular</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="6"
                    />
                </div>

                <button type="submit">Create Circular</button>
            </form>
        </div>
    );
};

export default CreateCircular;