import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

// Routes path
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/history', historyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})