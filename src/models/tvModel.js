const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export const formatTV = (tv) => ({
  id: tv.id,
  title: tv.name,
  overview: tv.overview,
  release_date: tv.first_air_date,
  genre_ids: tv.genre_ids,
  poster: tv.poster_path ? `${TMDB_IMAGE_BASE}w500${tv.poster_path}` : null,
  backdrop: tv.backdrop_path ? `${TMDB_IMAGE_BASE}original${tv.backdrop_path}` : null,
  type: tv.media_type,
  rating: tv.vote_average
})

