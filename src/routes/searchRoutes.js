import express from 'express';
import { searchMovies, searchMulti, searchTV } from '../controllers/searchController.js';

const router = express.Router();

router.get('/movie', searchMovies);
router.get('/tv', searchTV);
router.get('/multi', searchMulti);

export default router;