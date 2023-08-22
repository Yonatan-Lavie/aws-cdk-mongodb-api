import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  photo?: string;
  status: 'public' | 'verified' | 'unverified';
  role: 'anonymous' | 'user' | 'admin';
  verificationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String },
  status: { type: String, enum: ['public', 'verified', 'unverified'], default: 'unverified' },
  role: { type: String, enum: ['anonymous', 'user', 'admin'], default: 'anonymous' },
  verificationId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);