import supabase from "../config/supabaseClient.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const { data: authData, error } = await supabase.auth.signUp({
      options: {
        data: {
          username: username
        }
      },
      email,
      password,
    });

    if (error) throw error;

    const user = authData.user;

    if (user) {
      const { error } = await supabase
        .from('users')
        .insert({
          user_id: user.id,
          username: username,
          email: email,
        });

      if (error) throw error;
    }
    res.status(200).json({ 
      message: "Successfully signed up!",
      user: authData.user
    });
    
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
    res.status(200).json({ 
      message: "Successfully signed in!",
      user: data.user,
      session: data.session
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  
}