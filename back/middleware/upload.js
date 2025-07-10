// middleware/upload.js
import multer from 'multer';
import path from 'path';

// Save videos in /uploads/videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/videos'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000 * 1000 * 100 }, // Max 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi'];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only video files are allowed.'));
  },
});

export default upload;
