const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array().map(error => ({
          field: error.path,
          message: error.msg,
          value: error.value
        }))
      });
    }

    const { name, email, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      message,
      status: 'new'
    });

    await contact.save();

    res.status(201).json({
      status: 'success',
      message: 'Thank you for your message! I will get back to you soon.',
      data: { id: contact._id }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit message. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact messages (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = {};
    if (status) {
      filter.status = status;
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact messages'
    });
  }
});

// PUT /api/contact/:id/status - Update message status (admin only)
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be: new, read, replied, or archived'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact message not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Message status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update message status'
    });
  }
});

module.exports = router;
