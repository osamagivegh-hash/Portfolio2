const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is provided
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      console.error('Please set MONGODB_URI in your environment variables');
      process.exit(1);
    }

    // Validate MongoDB URI format
    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
      console.error('❌ Invalid MongoDB URI format');
      console.error('MongoDB URI must start with "mongodb://" or "mongodb+srv://"');
      console.error('Current URI:', mongoURI);
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    console.log('URI format:', mongoURI.startsWith('mongodb+srv://') ? 'MongoDB Atlas' : 'Local MongoDB');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('Please check your MongoDB connection string and network access');
    process.exit(1);
  }
};

module.exports = connectDB;
