
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables automatically exposed by the Lovable platform
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
