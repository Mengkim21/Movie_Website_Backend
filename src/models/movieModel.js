export const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  release_date: movie.release_date,
  runtime: movie.runtime,
  poster: movie.poster_path,
  backdrop: movie.backdrop_path,
  rating: movie.vote_average  
})