import { formatMovie } from "./movieMapper.js";
import { formatTV } from "./tvMapper.js";

export const formatSearchItem = (item) => {
  if (item.media_type === 'movie' || item.title) {
    return formatMovie(item);
  }
  return formatTV(item);
}