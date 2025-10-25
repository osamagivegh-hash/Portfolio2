const express = require('express');
const Project = require('../models/Project');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/projects/featured - Get featured projects
router.get('/featured', async (req, res) => {
  try {
    console.log('Fetching featured projects...');
    const projects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    console.log('Found featured projects:', projects.length);
    
    // Return empty array if no featured projects exist
    if (projects.length === 0) {
      return res.json({
        status: 'success',
        data: {
          projects: [],
          pagination: {
            current: 1,
            pages: 1,
            total: 0,
            limit: 6
          }
        }
      });
    }

    res.json({
      status: 'success',
      data: {
        projects,
        pagination: {
          current: 1,
          pages: 1,
          total: projects.length,
          limit: 6
        }
      }
    });

  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch featured projects'
    });
  }
});

// POST /api/projects - Create new project (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    console.log('Creating project with data:', req.body);
    const project = new Project(req.body);
    await project.save();
    console.log('Project created successfully:', project);
    
    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create project'
    });
  }
});

module.exports = router;
