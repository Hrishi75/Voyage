import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from '../config/env';
import { AuthRequest } from '../middleware/authMiddleware';

const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as jwt.SignOptions);
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const user = await User.create({ name, email, password });
  const token = generateToken((user._id as unknown as string));

  res.status(201).json({
    success: true,
    data: { user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar }, token },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken((user._id as unknown as string));

  res.json({
    success: true,
    data: { user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar }, token },
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: req.user });
};

export const googleAuth = async (req: Request, res: Response) => {
  const { email, name, googleId, avatar } = req.body;

  if (!email || !googleId) {
    return res.status(400).json({ success: false, message: 'Missing Google auth data' });
  }

  let user = await User.findOne({ $or: [{ googleId }, { email }] });

  if (!user) {
    user = await User.create({ name, email, googleId, avatar });
  } else if (!user.googleId) {
    user.googleId = googleId;
    if (avatar) user.avatar = avatar;
    await user.save();
  }

  const token = generateToken((user._id as unknown as string));

  res.json({
    success: true,
    data: { user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar }, token },
  });
};
