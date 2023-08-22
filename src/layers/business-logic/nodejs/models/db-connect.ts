import mongoose from 'mongoose';

export const connectDB = async () => {
  const env = process.env.NODE_ENV || 'dev';
  const dbUrl = process.env[`${env.toUpperCase()}_MONGO_URL`] || '';

  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error}`);
  }
};
export const closeConnectionDB = async () => {
  await mongoose.connection.close();
};