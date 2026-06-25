import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabseKey) {
  throw new Error("Supabase URL or KEY is missing in .env");
}

const supabase = createClient(supabaseUrl, supabseKey);
export default supabase;