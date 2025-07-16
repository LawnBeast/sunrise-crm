import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://gdapwnymzhquefttqlsf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkYXB3bnltemhxdWVmdHRxbHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTM0NzMsImV4cCI6MjA2Nzk4OTQ3M30.OtxpW7x_0smd1FY1VM4-oPmj19mR6lutjisU7dGjZYc';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };