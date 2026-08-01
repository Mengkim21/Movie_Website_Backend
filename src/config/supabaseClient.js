import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or KEY is missing in .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// export const createUserClient = (token) => {
//   return createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY, {
//     auth: { persistSession: false },
//     global: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     }
//   })
// }