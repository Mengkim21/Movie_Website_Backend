export const formatTV = (tv) => ({
  id: tv.id,
  name: tv.name,
  overview: tv.overview,
  release_date: tv.first_air_date,
  genre_id: tv.genre_ids,
  poster: tv.poster_path,
  backdrop: tv.backdrop_path,
  type: tv.media_type,
  rating: tv.vote_average
})

