import { Response } from 'express';
import Inquiry from '../models/Inquiry';
import { AuthRequest } from '../middleware/authMiddleware';

export const create = async (req: AuthRequest, res: Response) => {
  const { packageId, tierName, fullName, email, phone, travelDates, travelers, specialRequests } = req.body;

  if (!packageId || !tierName || !fullName || !email || !phone || !travelDates?.from || !travelDates?.to || !travelers) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' });
  }

  const inquiry = await Inquiry.create({
    user: req.user?._id,
    package: packageId,
    tierName,
    fullName,
    email,
    phone,
    travelDates,
    travelers,
    specialRequests,
  });

  const populated = await inquiry.populate('package', 'name slug duration');

  res.status(201).json({ success: true, data: populated });
};

export const getMyInquiries = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  const inquiries = await Inquiry.find({ user: req.user._id })
    .populate('package', 'name slug duration images')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: inquiries });
};
