
// Import the supabase client from the Lovable integration
import { supabase } from '@/integrations/supabase/client';

// Re-export the supabase client
export { supabase };

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
