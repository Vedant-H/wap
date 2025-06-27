import Notes from "../models/Notes.js";

const getNotes = async  (req,res)=>{
 
    const user_id = req.params.user_id;
    console.log(user_id);
    const result = await Notes.find({"user_id":user_id});
    return res.send(result);


}

export const deleteNote = async(req,res)=>{
    const result = await Notes.deleteOne({"_id":req.params.note_id});
    return res.send("Note deleted");
}

export const updateNote = async (req, res) => {
    const  noteId  = req.params.note_id;
    const { content } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        return res.status(400).json({ message: "Note content cannot be empty." });
    }

    try {
        const updatedNote = await Notes.findByIdAndUpdate(
            noteId,
            { content: content, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found." });
        }

        res.status(200).json({
            message: "Note updated successfully!",
            note: updatedNote,
        });

    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Server error when updating note." });
    }
};

export const setNotes = async (req,res)=>{
        console.log(req.body);

    const ans = await Notes.create({
            "user_id":req.body.user_id,
            "content":req.body.content,
        });

        ans.save();

       return res.send("added notes!!");

}

export default getNotes;

