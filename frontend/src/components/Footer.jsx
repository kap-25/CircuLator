// Footer component

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import "../App.css";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="footer">
      <div className="footer-row footer-controls">
        <button onClick={() => navigate(-1)} className="footer-btn">
          Back
        </button>
        <button onClick={handleLogout} className="footer-btn logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Footer;