// src/App.js
import React from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import MainRouter from "./router/MainRouter";
import "./App.css";

function App() {
  return (
    <AppProvider>
      {/* GLOBAL APP BACKGROUND */}
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
          color: "#fff",
        }}
      >
        <Header />
        <MainRouter />
      </div>
    </AppProvider>
  );
}

export default App;
