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
    res.status(500).json({ message: "Failed to fetch trending tv!" });
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
    res.status(500).json({ message: "Failed to fetch top rated tv!" });
  }
};

export const discoverTVByGenre = async (req, res) => {
  try {
    const { genreId } = req.query;
    const page = req.query.page || 1;
    const response = await tmdbClient.get(`/discover/tv`, {
      params: {
        with_genres: genreId,
        page: page,
        sort_by: 'popularity.desc'
      }
    });

    const tv = response.data.results.map(formatTV);
    res.status(200).json({
      message: "Successfully discover tv by genre",
      results: tv,
      total_pages: response.data.total_pages
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