const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
// Load environment variables
require('dotenv').config();

// Set default MongoDB URI if not provided
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://osamagivegh:990099@cluster0.npzs81o.mongodb.net/portfolio?retryWrites=true&w=majority';
}

// Debug: Log the MongoDB URI (first 20 characters only for security)
console.log('MongoDB URI (first 20 chars):', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'NOT SET');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);

const connectDB = require('./config/database');
const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const testimonialRoutes = require('./routes/testimonials');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:", "http://localhost:5000"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5000"]
    }
  }
}));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5173',
  'https://your-frontend-domain.onrender.com', // Replace with your actual frontend URL
  'https://your-portfolio.vercel.app', // Replace with your actual Vercel URL
  'https://osamaportfolio.vercel.app', // Your actual Vercel URL
  'https://*.vercel.app' // Allow all Vercel preview deployments
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Portfolio API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      portfolio: '/api/portfolio',
      contact: '/api/contact',
      projects: '/api/projects',
      skills: '/api/skills',
      testimonials: '/api/testimonials',
      admin: '/api/admin',
      upload: '/api/upload'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files (for CV downloads, images, etc.)
app.use('/uploads', (req, res, next) => {
  // Set CORS headers for static files
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, express.static('uploads'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    requestedPath: req.originalUrl,
    method: req.method,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /api/health',
      portfolio: 'GET /api/portfolio',
      contact: 'POST /api/contact',
      projects: 'GET /api/projects',
      skills: 'GET /api/skills',
      testimonials: 'GET /api/testimonials',
      admin: 'POST /api/admin/login',
      upload: 'POST /api/upload/*'
    },
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;
