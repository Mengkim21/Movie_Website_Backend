import { supabase } from '../config/supabaseClient.js';

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const { data: {user}, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    // req.supabase = createUserClient(token);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}