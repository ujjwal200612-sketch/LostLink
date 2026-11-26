const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lostlink';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[LostLink Backend] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[LostLink Backend] MongoDB connection warning: ${error.message}`);
    console.warn('[LostLink Backend] Ensure MongoDB service is running locally on port 27017 or update MONGODB_URI in backend/.env');
    return null;
  }
};

module.exports = connectDB;
