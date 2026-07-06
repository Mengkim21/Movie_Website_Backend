import tmdbClient from "../config/tmdb.js";
import { formatMovie } from "../models/movieModel.js";
import { formatTV } from "../models/tvModel.js";

export const searchMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const query = req.query.query || "";
    const response = await tmdbClient.get(`/search/movie?query=${query}&page=${page}`);
    const searches = response.data.results.map(formatMovie);

    if (!response) {
      return res.status(401).json({ message: "Failed to search for movies" });
    }
    res.status(200).json({
      message: "Successfully search for movies",
      results: searches
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchTV = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const query = req.query.query || "";
    const response = await tmdbClient.get(`/search/tv?query=${query}&page=${page}`);
    const TV = response.data.results.map(formatTV);

    if (!response) {
      return res.status(401).json({ message: "Failed to search for TV" });
    }

    res.status(200).json({
      message: "Successfully search for TV",
      results: TV
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}