# Learnova 📘  
### NCERT-Based Smart Learning Platform (DB-first + AI fallback)

Learnova is a smart educational platform designed for **Class 8–12 students**.  
It answers syllabus-based questions using a **database-first approach** and falls back to **Gemini AI** only when required.

---

##  Key Features

-  **NCERT Database First** (SQLite)
-  **Gemini AI fallback** if answer not found
-  Notes creation from answers
-  Practice questions support
-  Fast & accurate responses
-  Modern React UI

---

##  How It Works (Core Logic)

1. Student asks a question from the UI
2. Backend searches the **NCERT SQLite database**
3. If found → returns database answer
4. If not found → sends query to **Gemini AI**
5. Answer is shown with source (`database` / `gemini`)

This improves **accuracy, speed, and cost efficiency**.

---

## 🛠 Tech Stack

### Frontend
- React.js
- CSS / Tailwind
- Axios

### Backend
- Node.js
- Express.js
- SQLite (NCERT data)
- MongoDB (users & progress)
- Gemini API

---

##  Project Structure

learnovaproj/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── database/
│ └── server.js
│
├── frontend/
│ ├── src/
│ └── public/
│
├── .gitignore
└── README.md
