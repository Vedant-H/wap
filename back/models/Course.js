// models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  videoFilename: String, // Name of the saved file on server
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Course', courseSchema);
