import { getImageUrl } from '../utils/imageMapper.js'

export const formatCast = (cast) => {
  if (!cast) return;
  return cast
    .filter(person => person.profile_path)
    .slice(0, 12)
    .map(person => ({
      id: person.id,
      name: person.name,
      character: person.character,
      profile_path: getImageUrl(person.profile_path, 'w200')
    }));
};

export const formatDirector = (crew) => {
  if (!crew) return;
  return crew
    .filter(person => person.profile_path && person.job === 'Director')
    .map(person => ({
      id: person.id,
      name: person.name,
      job: person.job,
      profile_path: getImageUrl(person.profile_path, 'w200')
    }))
};