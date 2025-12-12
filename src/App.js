// src/App.js
import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import MainRouter from "./router/MainRouter";
import styles from "./styles/styles";

function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppProvider>
      <div style={styles.app}>
        {/* Header */}
        <Header
          onMenuToggle={() => setMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Router */}
        <MainRouter />
      </div>
    </AppProvider>
  );
}

export default App;
