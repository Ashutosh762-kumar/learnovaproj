// src/router/MainRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import DashboardPage from "../pages/DashboardPage";
import NotesPage from "../pages/NotesPage";
import PracticePage from "../pages/PracticePage";
import AccountPage from "../pages/AccountPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AskQuestion from "../pages/AskQuestion"; // ✅ NEW

import ProtectedRoute from "./ProtectedRoute";

export default function MainRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Ask Question (Public) */}
      <Route path="/ask" element={<AskQuestion />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/practice"
        element={
          <ProtectedRoute>
            <PracticePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
