const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    trim: true,
    maxlength: [30, 'Category cannot exceed 30 characters']
  },
  proficiency: {
    type: Number,
    min: [0, 'Proficiency cannot be less than 0'],
    max: [100, 'Proficiency cannot exceed 100'],
    default: 80
  },
  icon: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true,
    default: '#3B82F6'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
