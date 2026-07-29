import { formatCast, formatDirector } from "./creditMapper.js";
import { getImageUrl } from '../utils/imageMapper.js'

export const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  release_date: movie.release_date,
  runtime: movie.runtime,
  genre_ids: movie.genre_ids,
  poster: getImageUrl(movie.poster_path, 'w500'),
  backdrop: getImageUrl(movie.backdrop_path, 'original'),
  media_type: 'movie',
  rating: movie.vote_average === 0 ? "N/A" : movie.vote_average.toFixed(1),
  popularity: movie.popularity
})

export const formatMovieDetail = (data) => ({
  id: data.id,
  title: data.title,
  overview: data.overview,
  release_date: data.release_date,
  runtime: data.runtime,
  genre_ids: data.genre_ids,
  genres: data.genres || [],
  poster: getImageUrl(data.poster_path, 'w500'),
  backdrop: getImageUrl(data.backdrop_path, 'original'),
  media_type: 'movie',
  rating: data.vote_average === 0 ? "N/A" : data.vote_average.toFixed(1),
  budget: data.budget,
  logo_path: data.images?.logos?.find(l => l.iso_639_1 === 'en')?.file_path
    ? getImageUrl(data.images.logos.find(l => l.iso_639_1 === 'en').file_path, 'original')
    : null,
  trailer: data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || null,
  cast: formatCast(data.credits?.cast),
  director: formatDirector(data.credits?.crew),
  language: data.spoken_languages?.find(l => l.english_name).english_name,
  similar: data.similar?.results?.slice(0, 10).map(formatMovie)
})