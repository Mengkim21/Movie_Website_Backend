import tmdbClient from "../config/tmdb.js";
import { formatTV } from "../models/tvModel.js";

export const getTrendingTV = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const time_window = req.params.time_window;
    const resposne = await tmdbClient.get(`/trending/tv/${time_window}?page=${page}`);
    if (!['day', 'week'].includes(time_window)) {
      return res.status(400).json({ message: "Invalid time_window" });
    }
    const tv = resposne.data.results.map(formatTV);

    res.status(200).json({
      message: "Successfully fetch trending tv!",
      page: resposne.data.page,
      results: tv
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPopularTV = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/tv/popular?page=${page}`);
    const tv = response.data.results.map(formatTV);

    res.status(200).json({
      message: "Successfully fetch popular TV!",
      page: response.data.tv,
      results: tv
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopRatedTV = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/tv/top_rated?page=${page}`);
    const tv = response.data.results.map(formatTV);

    res.status(200).json({
      message: "Successfully fetch top rated TV!",
      page: response.data.tv,
      results: tv
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAiringTodayTV = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/tv/airing_today?page=${page}`);
    const tv = response.data.results.map(formatTV);

    res.status(200).json({
      message: "Successfully fetch airing today TV!",
      page: response.data.tv,
      results: tv
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let cache = null;
const getDiscoveryMeta = (type, genreId, allGenres) => {
  const categories = {
    popular: {
      title: 'Popular',
      description: 'The shows everyone is watching right now.'
    },
    top_rated: {
      title: 'Top Rated',
      description: 'Highest scoring picks based on global reviews.'
    },
    airing_today: {
      title: 'Airing Today',
      description: 'Series that streaming right now.'
    },
    all: {
      title: 'All Shows',
      description: 'A broad library of shows to explore.'
    },
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
}

export const discoverTVByGenre = async (req, res) => {
  try {
    const { type, page = 1 } = req.query;
    const genreId = req.query.genre || req.query.genre_id || req.query.genreId;
  
    let tmdbUrl = '/discover/tv';
    let params = { page };

    if (!cache) {
      const genreRes = await tmdbClient.get('/genre/tv/list');
      cache = genreRes.data.genres; 
    }
  
    if (genreId && genreId !== 'undefined') {
      tmdbUrl = '/discover/tv';
      params.with_genres = Number(genreId);
    } else if (type === 'popular') {
      tmdbUrl = '/tv/popular';
    } else if (type === 'top_rated') {
      tmdbUrl = '/tv/top_rated';
    } else if (type === 'airing_today') {
      tmdbUrl = '/tv/airing_today';
    }

    const response = await tmdbClient.get(tmdbUrl, { params });

    const tv = response.data.results.map(formatTV);
    const meta = getDiscoveryMeta(type, genreId, cache);

    res.status(200).json({
      message: "Successfully discover tv by genre",
      results: tv,
      total_pages: response.data.total_pages,
      page: response.data.page,
      meta
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTVDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await tmdbClient.get(`/tv/${id}`, {
      params: {append_to_response: 'credits,videos'}
    });
    const tv = response.data;
    res.status(200).json({
      ...formatTV(tv),
      episode_run_time: tv.episode_run_time,
      first_air_date: tv.first_air_date,
      genres: tv.genres,
      number_of_episodes: tv.number_of_episodes,
      number_of_seasons: tv.number_of_seasons,
      origin_country: tv.origin_country,
      last_air_date: tv.last_air_date,
      seasons: tv.seasons,
      cast: tv.credits.cast.slice(0, 10),
      director: tv.credits.crew.filter(member => member.job.includes('Director')),
      trailer: tv.videos.results.find(video => video.type === 'Trailer'),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}