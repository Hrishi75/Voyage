import { Router } from 'express';
import { getAll, getById, getFeatured } from '../controllers/packageController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/featured', asyncHandler(getFeatured));
router.get('/', asyncHandler(getAll));
router.get('/:id', asyncHandler(getById));

export default router;
