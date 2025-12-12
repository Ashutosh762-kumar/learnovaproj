import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [savedPractice, setSavedPractice] = useState([]);
  const [currentRoute, setCurrentRoute] = useState("/");
  const [username] = useState("Student User");

  useEffect(() => {
    const n = localStorage.getItem("learnova_notes");
    const p = localStorage.getItem("learnova_practice");
    if (n) setNotes(JSON.parse(n));
    if (p) setSavedPractice(JSON.parse(p));
  }, []);

  const persistNotes = (next) => {
    setNotes(next);
    localStorage.setItem("learnova_notes", JSON.stringify(next));
  };

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: "n" + Date.now(),
      createdAt: new Date().toISOString(),
      pinned: false,
    };
    persistNotes([...notes, newNote]);
  };

  const updateNote = (id, updates) => {
    persistNotes(notes.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  };

  const deleteNote = (id) => {
    persistNotes(notes.filter((n) => n.id !== id));
  };

  const savePracticeQuestion = (q) => {
    if (savedPractice.some((s) => s.id === q.id)) return;
    const updated = [...savedPractice, { ...q, savedAt: new Date().toISOString() }];
    setSavedPractice(updated);
    localStorage.setItem("learnova_practice", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        savedPractice,
        addNote,
        updateNote,
        deleteNote,
        savePracticeQuestion,
        currentRoute,
        setCurrentRoute,
        username
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
