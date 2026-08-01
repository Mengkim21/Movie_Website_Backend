import { supabase } from '../config/supabaseClient.js'; 
import tmdbClient from '../config/tmdb.js';
import { getImageUrl } from '../utils/imageMapper.js';

export const getWatchList = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('watchlist')
      .select(`
        *,
        media:media (*)  
      `)
      .eq('user_id', userId);

    if (error) throw error;
    res.status(200).json({ 
      message: 'Successfully receive watchlist!',
      results: data ?? []
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addToWatchList = async (req, res) => {
  try {
    const userId = req.user?.id;
     if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { media_id, media_type } = req.body;

    const endpoint = media_type === 'movie' ? `/movie/${media_id}` : `/tv/${media_id}`
    const tmdbResponse = await tmdbClient.get(endpoint);
  
    const mediaData = tmdbResponse.data;

    const { error: mediaError } = await supabase
      .from('media')
      .upsert({
        id: mediaData.id,
        title: mediaData.title || mediaData.name,
        overview: mediaData.overview,
        release_date: mediaData.release_date || mediaData.first_air_date,
        runtime: mediaData.runtime,
        number_of_seasons: mediaData.number_of_seasons,
        number_of_episodes: mediaData.number_of_episodes,
        poster: getImageUrl(mediaData.poster_path, 'w500'),
        backdrop: getImageUrl(mediaData.backdrop_path, 'original'),
        rating: mediaData.vote_average === 0 ? 'N/A' : mediaData.vote_average.toFixed(1),
        media_type: media_type,
      }, { onConflict: 'id, media_type' });

    if (mediaError) throw mediaError;

    const { error: watchlistError } = await supabase
      .from('watchlist')
      .insert({
        user_id: userId,
        media_id: media_id,
        media_type: media_type
      })
      .select(`
        *,
        media:media (*)
      `);

    if(watchlistError) throw watchlistError;

    return res.status(200).json({ message: "Successfully added to watchlist!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeFromWatchList = async (req, res) => {
  try {
    const userId = req.user?.id;
     if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { media_id, media_type } = req.body;

    const { error: watchlistError } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', userId)
      .eq('media_id', media_id)
      .eq('media_type', media_type);

    if (watchlistError) throw watchlistError;
    
    return res.status(200).json({ message: "Remove from watchlist successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}