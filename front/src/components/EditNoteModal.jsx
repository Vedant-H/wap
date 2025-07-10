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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blend-luminosity bg-opacity-50 backdrop-blur-xl">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col gap-4 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Edit Note</h2>
                <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[100px] bg-gray-50 text-gray-700"
                />
                <div className="flex justify-end gap-3 mt-2">
                    <Button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-1 rounded-lg">Cancel</Button>
                    <Button type="button" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded-lg">Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default EditNoteModal;