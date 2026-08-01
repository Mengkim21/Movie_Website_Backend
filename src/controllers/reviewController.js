import { supabase } from '../config/supabaseClient.js';

export const createReview = async (req, res) => {
  try {
    // Request required data from database
    const userId = req.user?.id;
     if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { media_id, media_type, rating, content } = req.body;

    // Check an existing review to prevent duplicate before add another one
    const { data: existingReview, error: existingError } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('media_id', media_id)
      .eq('media_type', media_type)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existingReview) {
      return res.status(400).json({ message: "Duplicate review" });
    }

    // Create a review
    const { error: reviewError } = await supabase
      .from('reviews')
      .insert({
        user_id: userId,
        media_id,
        media_type,
        rating,
        content,
      })
      .select(`
        *,
        media:media (*)
      `);

    if(reviewError) throw reviewError;

    return res.status(200).json({ message: "Successfully reviewed a movie!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const userId = req.user?.id;
     if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Retrieve reviews data
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        created_at,
        media_id,
        media_type,
        media:media (*)  
      `)
      .eq('user_id', userId);

    if (error) throw error;

    res.status(200).json({
      message: "Receive reviews succesfully!",
      results: data ?? []
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const userId = req.user?.id;
     if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { review_id, media_id, rating, content } = req.body

    // Check an existing review
    const { data: existingReview, error: existingCheckError } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('review_id', review_id)
      .eq('media_id', media_id)
      .maybeSingle();
    
    if (existingCheckError) throw existingCheckError;
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
      .eq('review_id', review_id)
      .eq('media_id', media_id);

    if (updateError) throw updateError;
    return res.status(200).json({ message: "Successfully updated review" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const userId = req.user?.id;
     if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { review_id, media_id } = req.body;

    // Check an existing review
    const { data: existingReview, existingCheckError } = await supabase
      .from('reviews')
      .select('review_id', 'media_id', 'user_id')
      .eq('user_id', userId)
      .eq('review_id', review_id)
      .eq('media_id', media_id)
      .maybeSingle();

    if (existingCheckError) throw existingCheckError;
    if (!existingReview) {
      return res.status(401).json({ message: "Review doesn't exist!" });
    }
    
    // Delete review after checking it existent
    const { error: reviewError } = await supabase
      .from('reviews')
      .delete()
      .eq('user_id', userId)
      .eq('review_id', review_id)
      .eq('media_id', media_id);

    if (reviewError) throw reviewError;

    return res.status(200).json({ message: "Successfully deleted the review"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};