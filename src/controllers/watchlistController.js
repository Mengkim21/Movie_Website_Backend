import { supabase } from '../config/supabaseClient.js'; 
import tmdbClient from '../config/tmdb.js';

export const getWatchList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    res.status(200).json({ watchlist: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addToWatchList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movie_id } = req.body;

    const { data: existingMovie } = await supabase
      .from('movies')
      .select('movie_id')
      .eq('movie_id', movie_id)
      .maybeSingle();

    if(!existingMovie) {
      const tmdbResponse = await tmdbClient.get(`/movie/${movie_id}`);
      const movieData = tmdbResponse.data;

      const { error: movieError } = await supabase
        .from('movies')
        .insert({
          movie_id: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          release_date: movieData.release_date,
          poster_path: movieData.poster_path,
          backdrop_path: movieData.backdrop_path,
          vote_average: movieData.vote_average,
          media_type: movieData.media_type || 'movie',
        })
        .select();
      
      if(movieError) throw movieError;
    }

    const { error: watchlistError } = await supabase
      .from('watchlist')
      .insert({
        user_id: userId,
        movie_id: movie_id,
      })
      .select();

    if(watchlistError && watchlistError.code !== '23505') {
      return res.status(400).json({ message: watchlistError.message });
    }
    res.status(200).json({ message: "Successfully added to watchlist!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromWatchList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movie_id } = req.body;

    const { data: existInWatchlist } = await supabase
      .from('watchlist')
      .select('movie_id')
      .eq('user_id', userId)
      .maybeSingle();

    if(existInWatchlist) {
      const { error: watchlistError } = await supabase
        .from('watchlist')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movie_id);
      
      if(watchlistError) throw watchlistError;
    }
    
    res.status(200).json({ message: "Remove from watchlist successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}