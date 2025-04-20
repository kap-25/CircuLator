// Login page for user authentication

import React, { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/auth/login", formData);
            const { token, user } = response.data;
      
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user)); // Save user info

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (err) {
            console.error("Login failed", err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
            <Link to="/register">Don't have an account? Register</Link>
        </div>
    );
};

export default LoginPage;