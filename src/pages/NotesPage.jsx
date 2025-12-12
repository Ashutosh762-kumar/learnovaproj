// src/pages/NotesPage.jsx
import React, { useState } from "react";
import styles from "../styles/styles";
import { Edit, Trash2, Pin } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import NoteModal from "../components/NoteModal";

const NotesPage = () => {
  const { notes, deleteNote, updateNote } = useAppContext();
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  return (
    <div className="page-container" style={styles.pageContainer}>

      <div>
        <h2 style={styles.pageHeading}>Your Notes</h2>

        {notes.length === 0 ? (
          <p style={{ color: "#aaa" }}>No notes available.</p>
        ) : (
          <div className="notes-grid" style={styles.notesGrid}>
            {notes.map((note) => (
              <div key={note.id} style={styles.noteCard}>
                <h4 style={styles.noteTitle}>{note.title}</h4>
                <p style={styles.noteContent}>
                  {note.content?.substring(0, 140)}
                  {note.content && note.content.length > 140 ? "..." : ""}
                </p>

                <div style={styles.noteActions}>
                  {/* Edit Note */}
                  <button
                    style={styles.iconBtn}
                    onClick={() => setEditing(note)}
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>

                  {/* Delete Note */}
                  <button
                    style={styles.iconBtn}
                    onClick={() => {
                      if (window.confirm("Delete this note?"))
                        deleteNote(note.id);
                    }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Pin Note */}
                  <button
                    style={styles.iconBtn}
                    onClick={() =>
                      updateNote(note.id, { pinned: !note.pinned })
                    }
                    title="Pin"
                  >
                    <Pin
                      size={16}
                      color={note.pinned ? "#667eea" : "#fff"}
                    />
                  </button>

                  {/* Show Note */}
                  <button
                    style={styles.showBtn}
                    onClick={() => setViewing(note)}
                  >
                    Show Note
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Sidebar />

      {/* Edit Modal */}
      {editing && (
        <NoteModal
          note={editing}
          onClose={() => setEditing(null)}
          onSave={(title, content) => {
            updateNote(editing.id, { title, content });
            setEditing(null);
          }}
        />
      )}

      {/* View Modal */}
      {viewing && (
        <NoteModal
          note={viewing}
          readOnly
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
};

export default NotesPage;
