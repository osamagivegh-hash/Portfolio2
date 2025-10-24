const express = require('express');
const Skill = require('../models/Skill');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/skills/categories - Get skills grouped by category
router.get('/categories', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    
    // Return empty object if no skills exist
    if (skills.length === 0) {
      return res.json({
        status: 'success',
        data: {}
      });
    }

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push({
        name: skill.name,
        proficiency: skill.proficiency,
        icon: skill.icon,
        color: skill.color
      });
      return acc;
    }, {});

    res.json({
      status: 'success',
      data: skillsByCategory
    });

  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch skills'
    });
  }
});

module.exports = router;
