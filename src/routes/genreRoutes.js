import express from 'express';
import { getMovieGenre, getTVGenre } from '../controllers/genreController.js';

const router = express.Router();

router.get('/movie', getMovieGenre);
router.get('/tv', getTVGenre);

export default router;