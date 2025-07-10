import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import EditNoteModal from '../components/EditNoteModal';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const [noteContent, setNoteContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);
    // Toast state
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    // Delete confirmation modal state
    const [deleteModal, setDeleteModal] = useState({ show: false, note: null });

    const { user } = useAuth();

    const fetchNotes = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:3000/api/notes/${user.id}`);
            setNotes(result.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, [user.id]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleNoteChange = (e) => {
        setNoteContent(e.target.value);
    };

    // Open delete confirmation modal
    const handleDeleteClick = (note) => {
        setDeleteModal({ show: true, note });
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        const note_id = deleteModal.note._id;
        try {
            await axios.delete(`http://localhost:3000/api/notes/${note_id}`);
            fetchNotes();
            setToast({ show: true, message: 'Note deleted successfully!', type: 'success' });
            // If the deleted note was open in the modal, close the modal
            if (noteToEdit && noteToEdit._id === note_id) {
                setIsModalOpen(false);
                setNoteToEdit(null);
            }
        } catch (error) {
            setToast({ show: true, message: 'Error deleting note.', type: 'error' });
            console.error("Error deleting note:", error);
        } finally {
            setDeleteModal({ show: false, note: null });
        }
    };

    // Cancel delete
    const handleCancelDelete = () => {
        setDeleteModal({ show: false, note: null });
    };

    const AddNotes = async (e) => {
        e.preventDefault();
        if (!noteContent.trim()) {
            setToast({ show: true, message: 'Note content cannot be empty.', type: 'error' });
            return;
        }
        try {
            await axios.post("http://localhost:3000/api/notes/", {
                user_id: user.id,
                content: noteContent
            });
            setNoteContent("");
            fetchNotes();
            setToast({ show: true, message: 'Note added!', type: 'success' });
        } catch (error) {
            setToast({ show: true, message: 'Error adding note.', type: 'error' });
            console.error("Error adding note:", error);
        }
    };

    const handleOpenEditModal = (note) => {
        setNoteToEdit(note);
        setIsModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsModalOpen(false);
        setNoteToEdit(null);
    };

    const handleSaveEditedNote = async (note_id, newContent) => {
        try {
            await axios.put(`http://localhost:3000/api/notes/${note_id}`, {
                content: newContent
            });
            handleCloseEditModal();
            fetchNotes();
            setToast({ show: true, message: 'Note updated!', type: 'success' });
        } catch (error) {
            setToast({ show: true, message: 'Error updating note.', type: 'error' });
            console.error("Error saving edited note:", error);
        }
    };

    // Toast auto-hide
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => setToast({ ...toast, show: false }), 2000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="min-h-screen pt-24  bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10 px-2">
            {/* Toast notification */}
            {toast.show && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.message}
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 z-40 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col gap-4 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Delete Note</h2>
                        <p className="text-gray-700 text-center">Are you sure you want to delete this note?</p>
                        <div className="flex justify-end gap-3 mt-2">
                            <Button type="button" onClick={handleCancelDelete} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-1 rounded-lg">Cancel</Button>
                            <Button type="button" onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-lg">Delete</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Dashboard</h1>
                <h2 className="text-lg text-gray-600 mb-6 text-center">Welcome <span className="font-semibold text-blue-600">{user.name}</span></h2>

                <h3 className="text-xl font-semibold text-gray-700 mb-3">Create New Note</h3>
                <form onSubmit={AddNotes} className="flex flex-col gap-3 mb-6">
                    <textarea
                        name="note"
                        id="note"
                        placeholder='Add your note here'
                        value={noteContent}
                        onChange={handleNoteChange}
                        className="resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[80px] bg-gray-50"
                    ></textarea>
                    <Button type="submit" className="w-fit self-end bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow">Add Note</Button>
                </form>
            </div>

            <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Notes</h2>
                <ul className="flex flex-col gap-4">
                    {notes.length > 0 ? (
                        notes.map(note => (
                            <li key={note._id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col gap-2">
                                <div className="text-gray-700 text-base whitespace-pre-line">{note.content}</div>
                                <div className="flex gap-3 mt-2">
                                    <Button type="button" onClick={() => handleOpenEditModal(note)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-1 rounded-lg">Update</Button>
                                    <Button type="button" onClick={() => handleDeleteClick(note)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-lg">Delete</Button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500 text-center py-8 bg-white rounded-xl shadow-inner">No notes yet. Add one above!</li>
                    )}
                </ul>
            </div>

            {/* Render the modal component conditionally */}
            <EditNoteModal
                isOpen={isModalOpen}
                note={noteToEdit}
                onClose={handleCloseEditModal}
                onSave={handleSaveEditedNote}
            />
        </div>
    );
};

export default DashboardPage;