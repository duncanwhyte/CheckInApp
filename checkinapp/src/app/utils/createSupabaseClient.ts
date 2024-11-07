import { createClient } from "@supabase/supabase-js";
export default function createSupabaseClient() {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
    return supabase
}