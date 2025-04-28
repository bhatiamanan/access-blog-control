
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing. Make sure you have connected your project to Supabase through Lovable\'s integration.');
  
  // Provide fallback values for development (these won't work for actual data)
  // This prevents the app from crashing, but functionality will be limited
  const fallbackUrl = 'https://placeholder-url.supabase.co';
  const fallbackKey = 'placeholder-key';
  
  // Create Supabase client with fallback values
  export const supabase = createClient(
    supabaseUrl || fallbackUrl, 
    supabaseAnonKey || fallbackKey
  );
} else {
  // Create Supabase client with real values
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Types for our database tables
export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
}

export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  author_id: string;
  created_at: string;
}
