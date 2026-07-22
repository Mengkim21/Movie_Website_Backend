import express from 'express';
import { 
  discoverTVByGenre, 
  getAiringTodayTV, 
  getPopularTV, 
  getTopRatedTV, 
  getTrendingTV, 
  getTVDetails 
} from "../controllers/tvController.js";
const router = express.Router();

router.get('/trending/:time_window', getTrendingTV);
router.get('/top_rated', getTopRatedTV);
router.get('/popular', getPopularTV);
router.get('/airing_today', getAiringTodayTV);
router.get('/discover', discoverTVByGenre);
router.get('/details/:id', getTVDetails);

export default router;