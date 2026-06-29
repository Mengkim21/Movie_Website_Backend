import tmdbClient from "../config/tmdb.js";

export const getMovieGenre = async (req, res) => {
  try {
    const response = await tmdbClient.get('/genre/movie/list');
    const genre = response.data.genres;

    res.status(200).json({
      message: "Successfully fetch movie genres!",
      genres: genre
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movie genres!" });
  }
};

export const getTVGenre = async (req, res) => {
  try {
    const response = await tmdbClient.get('/genre/tv/list');
    const tv = response.data.genres;

    res.status(200).json({
      message: "Successfully fetch tv genres!",
      genres: tv
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tv genres!" });
  }
};