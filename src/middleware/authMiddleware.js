import supabase from '../config/supabaseClient.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const { data: {user}, error } = await supabase.auth.getUser(token);
    req.user = user
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}