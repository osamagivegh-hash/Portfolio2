const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST /api/upload/profile-image - Upload profile image (admin only)
router.post('/profile-image', authenticateAdmin, upload.single('profileImage'), (req, res) => {
  try {
    console.log('Profile image upload request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    // Return the file path relative to the uploads directory
    const filePath = `/uploads/${req.file.filename}`;
    console.log('File uploaded successfully:', filePath);
    
    res.json({
      status: 'success',
      message: 'Profile image uploaded successfully',
      data: {
        filename: req.file.filename,
        path: filePath,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload image'
    });
  }
});

// POST /api/upload/project-image - Upload project image (admin only)
router.post('/project-image', authenticateAdmin, upload.single('projectImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    const filePath = `/uploads/${req.file.filename}`;
    
    res.json({
      status: 'success',
      message: 'Project image uploaded successfully',
      data: {
        filename: req.file.filename,
        path: filePath,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload image'
    });
  }
});

// POST /api/upload/testimonial-avatar - Upload testimonial avatar (admin only)
router.post('/testimonial-avatar', authenticateAdmin, upload.single('testimonialAvatar'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    const filePath = `/uploads/${req.file.filename}`;
    
    res.json({
      status: 'success',
      message: 'Testimonial avatar uploaded successfully',
      data: {
        filename: req.file.filename,
        path: filePath,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload image'
    });
  }
});

module.exports = router;
