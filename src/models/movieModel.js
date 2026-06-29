export const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  release_date: movie.release_date,
  runtime: movie.runtime,
  genre_id: movie.genre_ids,
  poster: movie.poster_path,
  backdrop: movie.backdrop_path,
  type: movie.media_type,
  rating: movie.vote_average  
})