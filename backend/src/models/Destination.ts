import mongoose, { Document, Schema } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  slug: string;
  country: string;
  type: 'indian' | 'foreign';
  image: string;
  description: string;
  featured: boolean;
  createdAt: Date;
}

const destinationSchema = new Schema<IDestination>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  country: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: ['indian', 'foreign'] },
  image: { type: String, required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

destinationSchema.index({ type: 1 });

export default mongoose.model<IDestination>('Destination', destinationSchema);
