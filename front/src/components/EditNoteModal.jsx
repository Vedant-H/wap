// src/components/EditNoteModal.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button'; // Assuming your Button component path

const EditNoteModal = ({ isOpen, note, onClose, onSave }) => {
    // Internal state for the content being edited in the modal
    const [editedContent, setEditedContent] = useState('');

    // Update editedContent whenever the 'note' prop changes (i.e., a new note is selected for editing)
    useEffect(() => {
        if (isOpen && note) {
            setEditedContent(note.content);
        }
    }, [isOpen, note]);

    if (!isOpen) {
        return null; // Don't render anything if the modal is not open
    }

    const handleSave = () => {
        if (editedContent.trim()) { // Basic validation
            onSave(note._id, editedContent); // Call the onSave prop with note ID and new content
        } else {
            alert("Note content cannot be empty.");
        }
    };

    // Simple modal styling (you'd typically use CSS modules or a styling library)
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalContentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '400px',
        maxWidth: '90%',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
    };

    const textareaStyle = {
        width: '100%',
        minHeight: '100px',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box', // Include padding in width/height
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
    };


    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>Edit Note</h2>
                <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    style={textareaStyle}
                />
                <div style={buttonContainerStyle}>
                    <Button type="button" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={handleSave}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default EditNoteModal;