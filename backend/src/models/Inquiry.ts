import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  user?: mongoose.Types.ObjectId;
  package: mongoose.Types.ObjectId;
  tierName: string;
  fullName: string;
  email: string;
  phone: string;
  travelDates: { from: Date; to: Date };
  travelers: number;
  specialRequests?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const inquirySchema = new Schema<IInquiry>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  tierName: { type: String, required: true },
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  travelDates: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  travelers: { type: Number, required: true, min: 1 },
  specialRequests: { type: String },
  status: { type: String, enum: ['pending', 'contacted', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<IInquiry>('Inquiry', inquirySchema);
