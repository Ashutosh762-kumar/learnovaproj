// src/utils/apiService.js

// 🔹 Base URL comes from Vercel Environment Variable
// Vercel → Settings → Environment Variables
// Key: VITE_API_URL
// Value: https://learnovaproj.onrender.com

const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔎 Safety check (helps debugging)
if (!API_BASE_URL) {
  console.error("❌ VITE_API_URL is not defined in environment variables");
}

/* ---------------------------
   GET REQUEST
---------------------------- */
export const getRequest = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API GET request failed");
  }

  return response.json();
};

/* ---------------------------
   POST REQUEST
---------------------------- */
export const postRequest = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API POST request failed");
  }

  return response.json();
};
