// User dashboard page

// src/pages/UserDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { Link } from "react-router-dom";
import "../App.css";

const UserDashboard = () => {
    const [circulars, setCirculars] = useState([]);
    const [acknowledgedIds, setAcknowledgedIds] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchCirculars = async () => {
            try {
                const res = await axios.get("/circulars");
                setCirculars(res.data);
            } catch (err) {
                console.error("Error fetching circulars:", err.message);
            }
        };

        const fetchAcknowledged = async () => {
            try {
                console.log("User ID type:", typeof user._id, "Value:", user._id);
                const res = await axios.get(`/acknowledge/by-user/${encodeURIComponent(user.email)}`);
                setAcknowledgedIds(res.data.map((ack) => ack.circular_id));
            } catch (err) {
                console.error("Error fetching acknowledgments:", err.message);
            }
        };

        fetchCirculars();
        fetchAcknowledged();
    }, [user.email]);

    const handleAcknowledge = async (circularId) => {
        try {
            console.log("Acknowledging Circular:", circularId);
            console.log("User ID:", user.id);

            if (!user.id || !circularId) {
                throw new Error("Missing user/circular ID");
            }

            await axios.post("/acknowledge/", {
                userId: user.id,
                circularId: circularId,
            });
            setAcknowledgedIds((prev) => [...prev, circularId]);
        } catch (err) {
            console.error("Acknowledgment failed:", err.response?.data || err.message);
        }
    };


    return (
        <div className="user-dashboard">
            <h2>Welcome, {user.email}</h2>
            <h3>Your Circulars</h3>

            <div className="circular-list">
                {circulars.map((circular) => (
                    <div key={circular._id} className="circular-card">
                        <h4>{circular.title}</h4>
                        <p>{circular.content}</p>
                        <small>
                            Created by: {circular.created_by} <br />
                            On: {new Date(circular.created_at).toLocaleString()}
                        </small>

                        {!acknowledgedIds.includes(circular._id) ? (
                            <button onClick={() => handleAcknowledge(circular._id)}>
                                Acknowledge
                            </button>
                        ) : (
                            <span style={{ color: "green" }}>✔ Acknowledged</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
