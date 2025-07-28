
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ufiobjnilffqulhaxkbo.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmaW9iam5pbGZmcXVsaGF4a2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NDI4MzQsImV4cCI6MjA2MzExODgzNH0.99xcplTZu5joUeKMsD-QTSm7NUNIiizUj4tHfjYUPHQ`
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;