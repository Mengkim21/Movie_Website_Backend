import supabase from "../config/supabaseClient.js";
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const { data, error } = await supabase.auth.signUp({
      options: {
        data: {
          username: username
        }
      },
      email,
      password,
    });

    if (error) throw error;
    res.status(200).json({ message: "Successfully signed up!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ success: false, message: "All fields are required"});
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error;
    res.status(200).json({ message: "Successfully signed in!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  
}