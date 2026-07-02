import { supabase } from "../config/supabaseClient.js";
import { updateProfile } from "../models/userModel.js";
import { auth } from '../middleware/authMiddleware.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      options: {
        data: { username },
      },
      email,
      password,
    });

    if (authError) throw authError;

    if (authData) {
      const { data, error } = await supabase
        .from('users')
        .insert({
          user_id: authData.user.id,
          username,
          email,
        })
        .select()
        .single();

      if (error) throw error;
    }
    res.status(200).json({ 
      message: "Successfully signed up!",
      user: authData.user
    });
    
  } catch (error) {
    console.log("Auth error: ", error.message);
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
    res.status(200).json({ 
      message: "Successfully signed in!",
      user: data.user,
      session: data.session
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, password, avatar_url } = req.body;

    if(email || password) {
      const { error: authError } = await supabase.updateUser({
        email,
        password,
      });
      
      if(authError) throw authError;
    }

    const updatedUser = await updateProfile(userId, {
      username,
      email,
      avatar_url,
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};