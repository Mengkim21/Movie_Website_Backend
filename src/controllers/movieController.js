import tmdbClient from '../config/tmdb.js';
import { formatMovie } from '../models/movieModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const getPopularMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/movie/popular?page=${page}`);
    const movies = response.data.results.map(formatMovie);
    res.json({
      page: response.data.page,
      results: movies
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular movies!" });
  }
};

export const getTopRatedMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/movie/top_rated?page=${page}`);
    const movies = response.data.results.map(formatMovie);
    res.json({
      page: response.data.page,
      results: movies
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top rated movies!" });
  }
};

export const getUpcomingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/movie/upcoming?page=${page}`);
    const movies = response.data.results.map(formatMovie);
    res.json({
      page: response.data.page,
      results: movies
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch upcoming movies!" });
  }
};