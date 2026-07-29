import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { addToHistory, getHistory } from '../controllers/historyController.js';

const router = express.Router();

router.get('/view', auth, getHistory);
router.post('/add', auth, addToHistory);

export default router;