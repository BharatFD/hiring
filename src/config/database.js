import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApiError } from '../utils/utils.js';  // Import ApiError from utils.js

dotenv.config(); 

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; 
    
    if (!uri) {
      throw new ApiError(500, 'MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    if (!(error instanceof ApiError)) {
      error = new ApiError(500, 'Failed to connect to MongoDB', [error.message]);
    }

    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;  
