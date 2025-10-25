const express = require('express');
const Testimonial = require('../models/Testimonial');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/testimonials/featured - Get featured testimonials
router.get('/featured', async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    
    const testimonials = await Testimonial.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    // Return empty array if no testimonials exist
    if (testimonials.length === 0) {
      return res.json({
        status: 'success',
        data: {
          testimonials: [],
          pagination: {
            current: 1,
            pages: 1,
            total: 0,
            limit: parseInt(limit)
          }
        }
      });
    }

    res.json({
      status: 'success',
      data: {
        testimonials,
        pagination: {
          current: 1,
          pages: 1,
          total: testimonials.length,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get featured testimonials error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch featured testimonials'
    });
  }
});

module.exports = router;
