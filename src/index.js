import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Routes path
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/genre', genreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})