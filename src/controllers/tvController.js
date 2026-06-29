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
}