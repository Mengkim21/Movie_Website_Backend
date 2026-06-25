import supabase from "../config/supabaseClient.js";

const userModel = {

  async getById(id) {
    const {data, error} = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single();

    if(error) throw error;
    if(!data) throw new Error("User not found!");
    return data;
  },
}