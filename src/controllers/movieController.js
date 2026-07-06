import tmdbClient from '../config/tmdb.js';
import { formatMovie } from '../models/movieModel.js';

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

export const getTrendingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const time_window = req.params.time_window;
    if (!['day', 'week'].includes(time_window)) {
      return res.status(400).json({ message: "Invalid time_window" });
    }
    const response = await tmdbClient.get(`/trending/movie/${time_window}`);
    const movies = response.data.results.map(formatMovie);
    res.json({
      page: response.data.page,
      results: movies
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trending movies!" });
  }
};

export const discoverMoviesByGenre = async (req, res) => {
  try {
    const { genreId } = req.query;
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/discover/movie`, {
      params: {
        with_genres: genreId,
        page: page,
        sort_by: 'popularity.desc'
      }
    });

    const movie = response.data.results.map(formatMovie);
    res.status(200).json({
      message: "Successfully discover movies",
      results: movie,
      total_pages: response.data.total_pages
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await tmdbClient.get(`/movie/${id}`, {
      params: {append_to_response: 'credits,videos'}
    });
    const movie = response.data;

    res.status(200).json({
      ...formatMovie(movie),
      budget: movie.budget,
      runtime: movie.runtime,
      status: movie.status,
      genres: movie.genres,
      origin_country: movie.origin_country,
      cast: movie.credits.cast.slice(0, 10),
      director: movie.credits.crew.filter(person => person.job == 'Director'),
      trailer: movie.videos.results.find(video => video.type === 'Trailer')
    });
  } catch (error) {
    res.status(400).json({ message: error.message });    
  }
}