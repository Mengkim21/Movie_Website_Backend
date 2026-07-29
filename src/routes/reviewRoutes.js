import express from 'express';
import { 
  createReview, 
  deleteReview, 
  getReviews, 
  updateReview 
} from '../controllers/reviewController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', auth, getReviews);
router.post('/add', auth, createReview);
router.patch('/update', auth, updateReview);
router.delete('/delete', auth, deleteReview);

export default router;