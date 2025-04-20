import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { Link } from "react-router-dom";
import "../App.css";

const AdminDashboard = () => {
    const [circulars, setCirculars] = useState([]);
    const [acknowledgementData, setAcknowledgementData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [circularsRes, acknowledgementsRes] = await Promise.all([
                    axios.get("/circulars"),
                    axios.get("/acknowledge") // Adjust endpoint as needed
                ]);
                console.log("Circulars response:", circularsRes.data);
                setCirculars(circularsRes.data);
                
                // Transform acknowledgements data
                const ackData = {};
                acknowledgementsRes.data.forEach(ack => {
                    if (!ackData[ack.circularTitle]) {
                        ackData[ack.circularTitle] = [];
                    }
                    ackData[ack.circularTitle].push(ack.userEmail);
                });
                setAcknowledgementData(ackData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <Link to="/create-circular">Create New Circular</Link>

            <div className="circular-list">
                {circulars.length === 0 ? (
                    <p>No circulars found.</p>
                ) : (
                    circulars.map((circular) => (
                        <div key={circular._id} className="circular-card">
                            <h3>{circular.title}</h3>
                            <p>{circular.content}</p>
                            <small>Created by: {circular.created_by}</small>
                            <br />
                            <small>{new Date(circular.created_at).toLocaleString()}</small>

                            <details>
                                <summary style={{ cursor: "pointer", color: "blue" }}>
                                    View Acknowledged Users
                                </summary>
                                <ul>
                                    {(acknowledgementData[circular.title] || []).map((email, idx) => (
                                        <li key={idx}>{email}</li>
                                    ))}
                                </ul>
                            </details>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;