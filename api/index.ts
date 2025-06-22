import mongoose from 'mongoose';
import app from '../src/app';
import 'dotenv/config';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library-management';

// MongoDB connection options for serverless
const mongooseOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
  bufferCommands: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Global variable to track connection status
let isConnected = false;

// Connect to MongoDB
const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri, mongooseOptions);
    isConnected = true;
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    isConnected = false;
  }
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

// Export for Vercel serverless
export default app; 