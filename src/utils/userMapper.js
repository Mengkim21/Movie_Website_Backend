import { supabase } from "../config/supabaseClient.js";

export const getById = async (user_id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id)
    .single();

  if(error) throw error;

  return data;
};

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if(error) throw error;
  return data;
};
