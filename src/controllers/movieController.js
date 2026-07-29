import tmdbClient from '../config/tmdb.js';
import { formatCast, formatDirector } from '../utils/creditMapper.js';
import { formatMovie, formatMovieDetail } from '../utils/movieMapper.js';

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
    
    const currentDate = new Date().toISOString().split('T')[0];
    const filteredMovies = response.data.results.filter(movie => {
      return movie.release_date >= currentDate;
    });

    const formattedResults = filteredMovies.map(formatMovie);
    
    res.json({
      page: response.data.page,
      results: formattedResults,
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

let cache = null;
const getDiscoveryMeta = (type, genreId, allGenres) => {
  const categories = {
    popular: {
      title: 'Popular',
      description: 'The movies everyone is watching right now.'
    },
    top_rated: {
      title: 'Top Rated',
      description: 'Highest scoring picks based on global reviews.'
    },
    upcoming: {
      title: 'Coming Soon',
      description: 'Upcoming release in theaters and streaming soon.'
    },
    all: {
      title: 'All Movies',
      description: 'A broad library of movies to explore.'
    }
  };

  if (type && categories[type]) return categories[type];

  if (genreId) {
    const genre = allGenres.find(g => g.id === Number(genreId));
    return {
      title: genre ? genre.name : 'Genre Explore',
      description: genre
        ? `The best selection of ${genre.name} cinema.`
        : 'A curated selection of movies from this genre.'
    }
  }

  return categories.all;
};

export const discoverMoviesByGenre = async (req, res) => {
  try {
    const { type, page = 1 } = req.query;
    const genreId = req.query.genreId || req.query.genre_id || req.query.genre;
    
    let tmdbUrl = '/discover/movie';
    let params = { page };
  
    if (!cache) {
      const genreRes = await tmdbClient.get('/genre/movie/list');
      cache =  genreRes.data.genres;
    }
  
    if (genreId && genreId !== 'undefined') {
      params.with_genres = Number(genreId);
    } else if (type === 'popular') {
      tmdbUrl = '/movie/popular';
    } else if (type === 'top_rated') {
      tmdbUrl = '/movie/top_rated';
    } else if (type === 'upcoming') {
      tmdbUrl = '/movie/upcoming';
    } 

    const response = await tmdbClient.get(tmdbUrl, { params });
 
    let results = response.data.results.map(formatMovie);

    if (type === 'upcoming') {
      const currentDate = new Date().toISOString().split('T')[0];
      results = results.filter(movie => movie.release_date >= currentDate);
    }

    const meta = getDiscoveryMeta(type, genreId, cache);
    
    res.status(200).json({
      message: "Successfully discover movies",
      results,
      total_pages: response.data.total_pages,
      page: response.data.page,
      meta
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await tmdbClient.get(`/movie/${id}`, {
      params: {append_to_response: 'credits,videos,similar,images'}
    });

    const movie = response.data;
    // const logo = movie.images.logos.find(logo => logo.iso_639_1 === 'en') || movie.images.logos[0];
    // const trailer = movie.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    res.status(200).json({
      ...formatMovieDetail(movie)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });    
  }
};

export const getFeaturedMovie = async (req, res) => {
  try {
    const time_window = req.params.time_window;
    const trendingRes = await tmdbClient.get(`/trending/movie/${time_window}`);
    const firstMovie = trendingRes.data.results[0];

    const imageRes = await tmdbClient.get(`/movie/${firstMovie.id}/images`);
    const logo = imageRes.data.logos.find(logo => logo.iso_639_1 === 'en') || firstMovie.logos[0];

    res.status(200).json({
      ...formatMovie(firstMovie),
      logo_path: logo ? `https://image.tmdb.org/t/p/original${logo.file_path}` : null
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}