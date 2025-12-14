// src/components/NoteModal.jsx
import React, { useState } from "react";
import styles from "../styles/styles";

const NoteModal = ({
  note,
  onClose,
  onSave,
  defaultTitle = "",
  defaultContent = "",
  readOnly = false,
}) => {
  const [title, setTitle] = useState(note?.title || defaultTitle);
  const [content, setContent] = useState(note?.content || defaultContent);

  const handleSave = () => {
    if (!readOnly && title.trim() && content.trim()) {
      onSave(title, content);
    }
  };

  return (
    <div
      className="modal-overlay"
      style={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className="modal-box"
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalTitle}>
          {readOnly ? "View Note" : note ? "Edit Note" : "Create Note"}
        </div>

        {/* Title input */}
        <input
          className="modal-input"
          style={{
            ...styles.modalInput,
            background: readOnly ? "#f1f1f1" : "#fff",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={readOnly}
          placeholder="Title"
        />

        {/* Content input */}
        <textarea
          className="modal-textarea"
          style={{
            ...styles.modalTextarea,
            background: readOnly ? "#f1f1f1" : "#fff",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          readOnly={readOnly}
          placeholder="Write your note..."
        />

        {/* Actions */}
        <div style={styles.modalActions}>
          <button
            className="modal-btn-cancel"
            style={{ padding: "8px 12px", borderRadius: 8 }}
            onClick={onClose}
          >
            {readOnly ? "Close" : "Cancel"}
          </button>

          {!readOnly && (
            <button className="modal-btn-save" style={styles.primaryBtn} onClick={handleSave}>
              Save Note
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
