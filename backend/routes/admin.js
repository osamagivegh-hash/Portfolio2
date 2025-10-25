const express = require('express');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { generateToken, authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/admin/login - Admin login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (admin.isLocked) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active
    if (!admin.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is disabled'
      });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await admin.incLoginAttempts();
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed. Please try again later.'
    });
  }
});

// GET /api/admin/profile - Get admin profile
router.get('/profile', authenticateAdmin, async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: req.admin
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch admin profile'
    });
  }
});

module.exports = router;
