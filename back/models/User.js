import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "Minimum characters for username must be 3"], 
    maxLength: [15, "Maximum characters for username must be 15"], 
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true, 
  },
});

const User = mongoose.model("User", UserSchema); 

export default User;