const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  about: {
    type: String,
    required: [true, 'About section is required'],
    trim: true,
    maxlength: [2000, 'About cannot exceed 2000 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone cannot exceed 20 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  profileImage: {
    type: String,
    trim: true
  },
  cvUrl: {
    type: String,
    trim: true
  },
  socialLinks: {
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    twitter: { type: String, trim: true },
    website: { type: String, trim: true }
  },
  stats: {
    projectsCompleted: {
      type: Number,
      default: 0,
      min: [0, 'Projects completed cannot be negative']
    },
    yearsExperience: {
      type: Number,
      default: 0,
      min: [0, 'Years experience cannot be negative']
    },
    clientSatisfaction: {
      type: Number,
      default: 100,
      min: [0, 'Client satisfaction cannot be less than 0'],
      max: [100, 'Client satisfaction cannot exceed 100']
    }
  },
  features: [{
    icon: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Feature title cannot exceed 50 characters']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Feature description cannot exceed 200 characters']
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure only one portfolio document exists
portfolioSchema.index({ isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });

module.exports = mongoose.model('Portfolio', portfolioSchema);
