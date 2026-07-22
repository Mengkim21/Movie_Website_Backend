const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  release_date: movie.release_date,
  runtime: movie.runtime,
  genre_ids: movie.genre_ids,
  poster: movie.poster_path ? `${TMDB_IMAGE_BASE}w500${movie.poster_path}` : null,
  backdrop: movie.backdrop_path ? `${TMDB_IMAGE_BASE}original${movie.backdrop_path}` : null,
  type: movie.media_type,
  rating: movie.vote_average === 0 ? "N/A" : movie.vote_average.toFixed(1)
})