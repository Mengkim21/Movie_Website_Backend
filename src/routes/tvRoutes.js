import express from 'express';
import { discoverTVByGenre, getTopRatedTV, getTrendingTV, getTVDetails } from "../controllers/tvController.js";
const router = express.Router();

router.get('/trending/:time_window', getTrendingTV);
router.get('/top_rated', getTopRatedTV);
router.get('/discover', discoverTVByGenre);
router.get('/details/:id', getTVDetails);

export default router;