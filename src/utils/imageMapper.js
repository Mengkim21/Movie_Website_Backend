const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export const getImageUrl = (path, size = 'w500') => {
  if (!path) {
    return `https://placehold.co/${size === 'original' ? '1920x1080' : '500x750'}?text=No+Image`
  }
  return `${TMDB_IMAGE_BASE}${size}${path}`
}