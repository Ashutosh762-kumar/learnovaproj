// db connection placeholder
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/learnova';
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
