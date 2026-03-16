import { Request, Response } from 'express';
import Package from '../models/Package';
import Destination from '../models/Destination';

export const getAll = async (req: Request, res: Response) => {
  const filter: Record<string, any> = {};

  if (req.query.destination) {
    const dest = await Destination.findOne({ slug: req.query.destination as string });
    if (dest) filter.destination = dest._id;
  }
  if (req.query.featured === 'true') filter.featured = true;

  const packages = await Package.find(filter)
    .populate('destination', 'name slug country type image')
    .sort({ featured: -1, createdAt: -1 });

  res.json({ success: true, data: packages });
};

export const getById = async (req: Request, res: Response) => {
  const pkg = await Package.findById(req.params.id)
    .populate('destination', 'name slug country type image description');

  if (!pkg) {
    return res.status(404).json({ success: false, message: 'Package not found' });
  }
  res.json({ success: true, data: pkg });
};

export const getFeatured = async (_req: Request, res: Response) => {
  const packages = await Package.find({ featured: true })
    .populate('destination', 'name slug country type image')
    .limit(6);

  res.json({ success: true, data: packages });
};
