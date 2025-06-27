import express from 'express';
import getNotes ,{ setNotes ,deleteNote , updateNote}  from '../controllers/notesController.js';

const noteRoute = express.Router();

noteRoute.post("/",setNotes);
noteRoute.get("/:user_id",getNotes);
noteRoute.delete("/:note_id",deleteNote);
noteRoute.put("/:note_id",updateNote);

export default noteRoute ;