import { Router } from 'express';
import { getAll, getBySlug, getFeatured } from '../controllers/destinationController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/featured', asyncHandler(getFeatured));
router.get('/', asyncHandler(getAll));
router.get('/:slug', asyncHandler(getBySlug));

export default router;
