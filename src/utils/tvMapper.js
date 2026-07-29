import { formatCast, formatDirector } from "./creditMapper.js";
import { getImageUrl } from '../utils/imageMapper.js'

export const formatTV = (tv) => ({
  id: tv.id,
  title: tv.name,
  overview: tv.overview,
  release_date: tv.first_air_date,
  genre_ids: tv.genre_ids,
  poster: getImageUrl(tv.poster_path, 'w500'),
  backdrop: getImageUrl(tv.poster_path, 'original'),
  media_type: 'tv',
  rating: tv.vote_average === 0 ? 'N/A' : tv.vote_average.toFixed(1),
  popularity: tv.popularity
});

export const formatTVDetail = (data) => ({
  id: data.id,
  title: data.title,
  overview: data.overview,
  release_date: data.first_air_date,
  genre_ids: data.genre_ids,
  genres: data.genres || [],
  poster: getImageUrl(data.poster_path, 'w500'),
  backdrop: getImageUrl(data.backdrop_path, 'original'),
  media_type: 'tv',
  rating: data.vote_average === 0 ? "N/A" : data.vote_average.toFixed(1),
  budget: data.budget,
  number_of_episodes: data.number_of_episodes,
  number_of_seasons: data.number_of_seasons,
  logo_path: data.images?.logos?.find(l => l.iso_639_1 === 'en')?.file_path
    ? getImageUrl(data.images.logos.find(l => l.iso_639_1 === 'en').file_path, 'original')
    : null,
  trailer: data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || null,
  cast: formatCast(data.credits?.cast),
  director: formatDirector(data.credits?.crew),
  language: data.spoken_languages?.find(l => l.english_name).english_name,
  similar: data.similar?.results?.slice(0, 10).map(formatTV)
});

