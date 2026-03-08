import { createClient } from '@supabase/supabase-js';

// Ye details aapko apne Supabase project ke "Project Settings > API" mein milengi
const supabaseUrl = 'https://ivuahrbcszzybdfeiawd.supabase.co'; // Ise apni URL se replace karen
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dWFocmJjc3p6eWJkZmVpYXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NjUzMTIsImV4cCI6MjA3ODI0MTMxMn0.V_KwDl63VRyoAKn2fHdY-UpDnONrypF2o_0g7TncaB4'; // Ise apni Key se replace karen

export const supabase = createClient(supabaseUrl, supabaseAnonKey);