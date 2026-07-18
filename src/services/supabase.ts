import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto"; // Needed for Supabase URL parsing in RN

// TODO: Replace these with your actual Supabase project URL and anon key
const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Prevents Supabase from trying to parse web URLs on mobile natively
  },
});
