import express from 'express';
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getTrendingMovies, 
  getUpcomingMovies 
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/popular', getPopularMovies);
router.get('/top_rated', getTopRatedMovies);
router.get('/upcoming', getUpcomingMovies);
router.get('/trending/:time_window', getTrendingMovies);
// router.get('/trending/week', getTrendingMovies);

export default router;