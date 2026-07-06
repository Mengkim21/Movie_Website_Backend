import express from 'express';
import { searchMovies, searchTV } from '../controllers/searchController.js';

const router = express.Router();

router.get('/movie', searchMovies);
router.get('/tv', searchTV);

export default router;