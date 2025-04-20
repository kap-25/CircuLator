// Main app file (sets up routes)

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateCircular from "./pages/CreateCircular";
import RegisterPage from "./pages/RegisterPage";

import { isLoggedIn, getUser } from "./utils/auth";

const App = () => {
  const user = getUser();
  
  const PrivateRoute = ({ children, role }) => {
    const user = getUser();
    if (!isLoggedIn() || !user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Header />
      <div className="app-container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/user"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-circular"
            element={
              <PrivateRoute role="admin">
                <CreateCircular />
              </PrivateRoute>
            }
          />

          {/* Redirect default to dashboard based on role */}
          <Route
            path="/"
            element={
              isLoggedIn() ? (
                user.role === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/user" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;