import express from 'express';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/popular', getPopularMovies);
router.get('/top_rated', getTopRatedMovies);
router.get('/upcoming', getUpcomingMovies);

export default router;