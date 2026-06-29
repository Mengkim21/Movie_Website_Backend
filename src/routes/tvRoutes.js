import express from 'express';
import { getTopRatedTV, getTrendingTV } from "../controllers/tvController.js";
const router = express.Router();

router.get('/trending/:time_window', getTrendingTV);
router.get('/top_rated', getTopRatedTV);

export default router;