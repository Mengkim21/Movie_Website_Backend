import express from 'express';
import { addToWatchList, getWatchList, removeFromWatchList } from '../controllers/watchlistController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/view', auth, getWatchList);
router.post('/add', auth, addToWatchList);
router.delete('/remove', auth, removeFromWatchList);

export default router;