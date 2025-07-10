// routes/courseRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import Course from '../models/Course.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Add course with video upload
router.post('/add', upload.single('video'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const videoFilename = req.file.filename;

    const course = new Course({ title, description, category, videoFilename });
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Serve video file
router.get('/video/:filename', (req, res) => {
  const videoPath = path.join('uploads/videos', req.params.filename);

  // Stream video
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0]);
    const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

export default router;
