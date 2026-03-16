import mongoose, { Document, Schema } from 'mongoose';

export interface ITier {
  name: 'deluxe' | 'luxury' | 'ultra-luxury';
  price: number;
  priceLabel: string;
  inclusions: string[];
  hotel: string;
  meals: string;
  transport: string;
}

export interface IPackage extends Document {
  destination: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  duration: string;
  images: string[];
  highlights: string[];
  featured: boolean;
  tiers: ITier[];
  createdAt: Date;
}

const tierSchema = new Schema<ITier>({
  name: { type: String, required: true, enum: ['deluxe', 'luxury', 'ultra-luxury'] },
  price: { type: Number, required: true },
  priceLabel: { type: String, default: 'per person' },
  inclusions: [{ type: String }],
  hotel: { type: String, required: true },
  meals: { type: String, required: true },
  transport: { type: String, required: true },
}, { _id: false });

const packageSchema = new Schema<IPackage>({
  destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  images: [{ type: String }],
  highlights: [{ type: String }],
  featured: { type: Boolean, default: false },
  tiers: { type: [tierSchema], required: true, validate: [(v: ITier[]) => v.length > 0, 'At least one tier required'] },
}, { timestamps: true });

packageSchema.index({ destination: 1 });

export default mongoose.model<IPackage>('Package', packageSchema);
