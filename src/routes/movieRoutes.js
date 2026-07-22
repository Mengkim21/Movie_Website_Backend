import express from 'express';
import { 
  discoverMoviesByGenre,
  getFeaturedMovie,
  getMovieDetails,
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
router.get('/discover', discoverMoviesByGenre);
router.get('/details/:id', getMovieDetails);
router.get('/featured', getFeaturedMovie);

export default router;