import { Router } from 'express';
import { create, getMyInquiries } from '../controllers/inquiryController';
import { protect, optionalAuth } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/', optionalAuth, asyncHandler(create));
router.get('/mine', protect, asyncHandler(getMyInquiries));

export default router;
