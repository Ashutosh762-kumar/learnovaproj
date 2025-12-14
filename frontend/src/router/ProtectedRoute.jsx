// src/router/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // send to login and preserve the page they wanted
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
  