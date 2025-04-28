import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bbjetszdpitznhxmwhre.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiamV0c3pkcGl0em5oeG13aHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTQ2NTIsImV4cCI6MjA2MTQzMDY1Mn0._kDYV2-MoxpsKkIh7qb0RwvXgMZWy2gG8YOCSRrivAk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);