import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables missing:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    allEnvVars: Object.keys(import.meta.env)
  });
  
  // Create a placeholder client to prevent app crashes
  // This allows the app to load while you configure Cloud
  throw new Error(
    'Supabase not configured. Please check Cloud settings for your connection details.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
