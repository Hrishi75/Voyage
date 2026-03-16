import { Router } from 'express';
import { register, login, getMe, googleAuth } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/google', asyncHandler(googleAuth));
router.get('/me', protect, asyncHandler(getMe));

export default router;
