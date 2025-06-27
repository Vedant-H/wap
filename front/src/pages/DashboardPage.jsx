// import axios from 'axios';
// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import { Button } from '../components/ui/button';

// const DashboardPage = () => {
//     const { id: userId } = useParams();
//     const [userName, setUserName] = useState("");
//     const [noteContent, setNoteContent] = useState("");
//     const [notes, setNotes] = useState([]);

//     useEffect(() => {
//         async function getUser() {
//             try {
//                 const result = await axios.get(`http://localhost:3000/api/user/${userId}`);
//                 setUserName(result.data.username);
//             } catch (error) {
//                 console.error("Error fetching username:", error);
//             }
//         }
//         getUser();
//     }, [userId]);

//     const fetchNotes = useCallback(async () => {
//         try {
//             const result = await axios.get(`http://localhost:3000/api/notes/${userId}`);
//             setNotes(result.data);
//         } catch (error) {
//             console.error("Error fetching notes:", error);
//         }
//     }, [userId]);

//     useEffect(() => {
//         fetchNotes();
//     }, [fetchNotes]);

//     const handleNoteChange = (e) => {
//         setNoteContent(e.target.value);
//     };
//     const handleDelete = async (note_id)=>{
//         if(!window.confirm("are you sure you want to delete this note ?")){
//             return;
//         }
//         const result = await axios.delete(`http://localhost:3000/api/notes/${note_id}`)
//         fetchNotes();
//     }

//     const AddNotes = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:3000/api/notes/", {
//                 "user_id": userId,
//                 "content": noteContent
//             });
//             console.log("Note added:", res.data);
//             setNoteContent("");
//             fetchNotes();
//         } catch (error) {
//             console.error("Error adding note:", error);
//         }
//     };

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <h2>Welcome {userName}</h2>

//             <h1>Create Notes</h1>
//             <form onSubmit={AddNotes}>
//                 <textarea
//                     name="note"
//                     id="note"
//                     placeholder='Add your note here'
//                     value={noteContent}
//                     onChange={handleNoteChange}
//                 ></textarea>
//                 <Button type="submit">Add Note</Button>
//             </form>

//             <h2>Your Notes</h2>
//             <ul>
//                 {notes.length > 0 ? (
//                     notes.map(note => (
//                         <li key={note._id}>
//                             {note.content}
//                             <Button>Update</Button>
//                             <Button onClick ={()=>handleDelete(note._id)} >delete</Button>
//                         </li>
//                     ))
//                 ) : (
//                     <li>No notes yet. Add one above!</li>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default DashboardPage;
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button'; // Adjust path if needed
import EditNoteModal from '../components/EditNoteModal'; // Import the new modal component
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const [noteContent, setNoteContent] = useState("");
    const [notes, setNotes] = useState([]);

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null); // Stores the full note object being edited

    const {user}=useAuth(); 

    const fetchNotes = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:3000/api/notes/${user.id}`); // Assuming this endpoint for notes by user
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

    const handleDelete = async (note_id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/api/notes/${note_id}`);
            fetchNotes();
            // If the deleted note was open in the modal, close the modal
            if (noteToEdit && noteToEdit._id === note_id) {
                setIsModalOpen(false);
                setNoteToEdit(null);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const AddNotes = async (e) => { // This function is now ONLY for adding new notes
        e.preventDefault();

        if (!noteContent.trim()) {
            alert("Note content cannot be empty.");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/notes/", {
                user_id: user.id,
                content: noteContent
            });
            setNoteContent("");
            fetchNotes();
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // New: Function to open the modal for editing
    const handleOpenEditModal = (note) => {
        setNoteToEdit(note); // Set the note object to be edited
        setIsModalOpen(true); // Open the modal
    };

    // New: Function to close the modal (from modal's Cancel button or background click)
    const handleCloseEditModal = () => {
        setIsModalOpen(false);
        setNoteToEdit(null); // Clear the note being edited
    };

    // New: Function to handle saving changes from the modal
    const handleSaveEditedNote = async (note_id, newContent) => {
        try {
            await axios.put(`http://localhost:3000/api/notes/${note_id}`, {
                content: newContent
            });
            console.log("Note updated successfully!");
            handleCloseEditModal(); // Close the modal
            fetchNotes(); // Refresh the notes list
        } catch (error) {
            console.error("Error saving edited note:", error);
            // Display error to user if needed
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome {user.name}</h2>

            <h1>Create New Note</h1> {/* No longer "Edit Note" here */}
            <form onSubmit={AddNotes}>
                <textarea
                    name="note"
                    id="note"
                    placeholder='Add your note here'
                    value={noteContent}
                    onChange={handleNoteChange}
                ></textarea>
                <Button type="submit">Add Note</Button> {/* Always "Add Note" */}
            </form>

            <h2>Your Notes</h2>
            <ul>
                {notes.length > 0 ? (
                    notes.map(note => (
                        <li key={note._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                            {note.content}
                            <div style={{ marginTop: '5px' }}>
                                {/* Call handleOpenEditModal when Update is clicked */}
                                <Button type="button" onClick={() => handleOpenEditModal(note)}>Update</Button>
                                <Button type="button" onClick={() => handleDelete(note._id)} style={{ marginLeft: '10px' }}>Delete</Button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No notes yet. Add one above!</li>
                )}
            </ul>

            {/* Render the modal component conditionally */}
            <EditNoteModal
                isOpen={isModalOpen}
                note={noteToEdit} // Pass the entire note object
                onClose={handleCloseEditModal}
                onSave={handleSaveEditedNote}
            />
        </div>
    );
};

export default DashboardPage;