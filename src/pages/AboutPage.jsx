// src/pages/AboutPage.jsx
import React from "react";
import styles from "../styles/styles";
import Sidebar from "../components/Sidebar";

const AboutPage = () => (
  <div className="page-container" style={styles.pageContainer}>

    <div>
      <h2 style={styles.pageHeading}>About Learnova</h2>

      <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 10 }}>
        <h3 style={{ marginTop: 0 }}>What is Learnova?</h3>
        <p style={{ color: "#ddd" }}>
          Learnova helps students (class 10–12) ask syllabus questions, save quick notes and practice with quizzes.
          It’s built to be lightweight, fast, and easy to use — designed specifically for school-level study help.
        </p>

        <h4 style={{ marginTop: 12 }}>Features</h4>
        <ul style={{ color: "#ddd", lineHeight: 1.8 }}>
          <li>Save quick notes for topics you study.</li>
          <li>Practice short quizzes and track attempts in local storage.</li>
          <li>Save practice questions for later review.</li>
          <li>Simple dashboard with your basic stats.</li>
        </ul>

        <h4 style={{ marginTop: 12 }}>For any query</h4>
        <p style={{ color: "#ddd", marginBottom: 0 }}>
             Contact our support team: mail: learnova@support.com
             Contact No. : +91 1234567987
        </p>
      </div>
    </div>

    <Sidebar />
  </div>
);

export default AboutPage;
