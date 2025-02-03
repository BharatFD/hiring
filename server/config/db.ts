import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log(" chal gaya ");
  } catch (error) {
    console.error("gaya db", error);
    
  }
};

export default connectDB;
