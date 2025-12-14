// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to login.");
    }
  }

  return (
    <div className="center-viewport">
      <div className="auth-card-container">
        <div className="auth-card-left auth-welcome">
          <h1>Welcome to Learnova!</h1>
  <p>
    A place where curiosity begins,<br />
    knowledge grows,<br />
    and futures are built.
  </p>
        </div>

        <div className="auth-card">
          <h2 className="auth-card-title">Sign in</h2>
          <p className="auth-card-sub">Welcome back!</p>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-btn" type="submit">
              Login
            </button>

            <div className="auth-footer">
              Not a member? <Link to="/signup">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
