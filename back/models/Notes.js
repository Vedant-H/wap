import mongoose from "mongoose";

const NotesSchema  = mongoose.Schema({
    content:{
        type : String,
        required : true,
        trim : true,
    },
    user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }

})

const Notes = mongoose.model("Notes",NotesSchema);
export default Notes;