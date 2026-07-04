import { supabase } from '../config/supabaseClient.js';

export const createReview = async (req, res) => {
  try {
    // Request required data from database
    const userId = req.user.id;
    const { movie_id, rating, content } = req.body;

    // Check an existing review to prevent duplicate before add another one
    const { data: existingReview, error: existingError } = await supabase
      .from('reviews')
      .select('*')
      .eq('movie_id', movie_id)
      .eq('user_id', userId)
      .eq('rating', rating)
      .eq('content', content)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existingReview) {
      return res.status(400).json({ message: "Duplicate review" });
    }

    // Create a review
    const { error: reviewError } = await supabase
      .from('reviews')
      .insert({
        movie_id,
        user_id: userId,
        rating,
        content,
      })
      .select();

    if(reviewError) throw reviewError;

    res.status(200).json({ message: "Successfully reviewed a movie!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    // Retrieve reviews data
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    res.status(200).json({
      message: "Receive reviews succesfully!",
      reviews: data
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { review_id, rating, content } = req.body

    // Check an existing review
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('review_id', 'movie_id', 'user_id')
      .eq('user_id', userId)
      .eq('review_id', review_id)
      .maybeSingle();
    
    if (!existingReview) {
      return res.status(401).json({ message: "Review doesn't exist!" });
    }

    // Update review after checking it existent
    const { error: updateError } = await supabase
      .from('reviews')
      .update({
        rating,
        content,
      })
      .eq('user_id', userId)
      .eq('review_id', review_id);

    if (updateError) throw updateError;
    res.status(200).json({ message: "Successfully updated review" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { review_id } = req.body;

    // Check an existing review
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('review_id', 'movie_id', 'user_id')
      .eq('user_id', userId)
      .eq('review_id', review_id)
      .maybeSingle();

    if (!existingReview) {
      return res.status(401).json({ message: "Review doesn't exist!" });
    }
    
    // Delete review after checking it existent
    const { error: reviewError } = await supabase
      .from('reviews')
      .delete()
      .eq('user_id', userId)
      .eq('review_id', review_id);

    if (reviewError) throw reviewError;

    res.status(200).json({ message: "Successfully deleted the review"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};