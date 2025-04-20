// Header component

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import "../App.css";

const Header = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-row header-controls">
        <div className="header-logo-center">
          <Link to="/" className="header-logo">
            CircuLator
          </Link>
        </div>
      </div>

      {user && (
        <div className="header-user-center">
          Logged in as: <strong>{user.name}</strong>
        </div>
      )}
    </header>
  );
};

export default Header;