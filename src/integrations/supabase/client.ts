// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fxdndoimqnvsxsjhlaqy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZG5kb2ltcW52c3hzamhsYXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MjQxMjAsImV4cCI6MjA2MTEwMDEyMH0.xq7g-VJi_i_rxDMHiim0cwtpIdk3f3xn1XQ45FaA_nE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);