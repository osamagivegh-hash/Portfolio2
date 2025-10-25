const express = require('express');
const Portfolio = require('../models/Portfolio');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/portfolio - Get portfolio information
router.get('/', async (req, res) => {
  try {
    console.log('Fetching portfolio data...');
    const portfolio = await Portfolio.findOne({ isActive: true });
    console.log('Portfolio found:', portfolio ? 'Yes' : 'No');
    if (portfolio) {
      console.log('Portfolio profileImage:', portfolio.profileImage);
    }
    
    if (!portfolio) {
      // Return default portfolio data if none exists
      const defaultPortfolio = {
        name: "Osama Md. Mousa",
        title: "Full Stack Developer",
        about: "I am a passionate full stack developer with over 3 years of experience in building scalable web applications. I specialize in modern JavaScript frameworks and have a strong background in both frontend and backend development. My expertise includes creating responsive user interfaces, designing robust APIs, and implementing efficient database solutions. I'm always eager to learn new technologies and take on challenging projects.",
        email: "osama@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        profileImage: "https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=OM",
        cvUrl: "/api/cv/download",
        socialLinks: {
          linkedin: "#",
          github: "#",
          twitter: "#",
          website: "#"
        },
        stats: {
          projectsCompleted: 50,
          yearsExperience: 3,
          clientSatisfaction: 100
        },
        features: [
          {
            icon: "🎯",
            title: "Problem Solving",
            description: "Creative solutions for complex challenges"
          },
          {
            icon: "⚡",
            title: "Fast Delivery",
            description: "Quick turnaround without compromising quality"
          },
          {
            icon: "🔧",
            title: "Maintenance",
            description: "Ongoing support and updates"
          },
          {
            icon: "📱",
            title: "Responsive",
            description: "Works perfectly on all devices"
          }
        ]
      };
      
      return res.json({
        status: 'success',
        data: defaultPortfolio
      });
    }

    res.json({
      status: 'success',
      data: portfolio
    });

  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch portfolio information'
    });
  }
});

// PUT /api/portfolio - Update portfolio information (admin only)
router.put('/', authenticateAdmin, async (req, res) => {
  try {
    const updateData = req.body;
    console.log('Portfolio update request received:', updateData);
    
    const portfolio = await Portfolio.findOneAndUpdate(
      { isActive: true },
      updateData,
      { 
        new: true, 
        runValidators: true,
        upsert: true // Create if doesn't exist
      }
    );

    console.log('Portfolio updated successfully:', portfolio);
    res.json({
      status: 'success',
      message: 'Portfolio updated successfully',
      data: portfolio
    });

  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update portfolio information'
    });
  }
});

// GET /api/portfolio/cv - Download CV
router.get('/cv', (req, res) => {
  try {
    // In a real application, you would serve the actual CV file
    // For now, we'll return a placeholder response
    res.json({
      status: 'success',
      message: 'CV download endpoint',
      data: {
        url: '/api/cv/download',
        filename: 'Osama_Md_Mousa_CV.pdf',
        size: '2.5 MB'
      }
    });
  } catch (error) {
    console.error('CV download error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process CV download'
    });
  }
});

// GET /api/portfolio/cv/download - Actual CV download
router.get('/cv/download', (req, res) => {
  try {
    // In a real application, you would serve the actual CV file
    // For demo purposes, we'll return a placeholder
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Osama_Md_Mousa_CV.pdf"');
    
    // You would typically use fs.readFileSync or similar to serve the actual file
    res.send('CV file content would be here in a real application');
    
  } catch (error) {
    console.error('CV file download error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to download CV file'
    });
  }
});

module.exports = router;
