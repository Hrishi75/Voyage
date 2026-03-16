import { Request, Response } from 'express';
import Destination from '../models/Destination';

export const getAll = async (req: Request, res: Response) => {
  const filter: Record<string, any> = {};
  if (req.query.type) filter.type = req.query.type;

  const destinations = await Destination.find(filter).sort({ featured: -1, name: 1 });
  res.json({ success: true, data: destinations });
};

export const getBySlug = async (req: Request, res: Response) => {
  const destination = await Destination.findOne({ slug: req.params.slug });
  if (!destination) {
    return res.status(404).json({ success: false, message: 'Destination not found' });
  }
  res.json({ success: true, data: destination });
};

export const getFeatured = async (_req: Request, res: Response) => {
  const destinations = await Destination.find({ featured: true }).limit(8);
  res.json({ success: true, data: destinations });
};
