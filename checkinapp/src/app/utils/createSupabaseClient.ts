import { createClient } from "@supabase/supabase-js"
export default function supabaseClient() {
    const supabaseURL = (process.env.NEXT_PUBLIC_SUPABASE_URL as string)
    const supabaseApiKey = (process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string)
    const client = createClient(supabaseURL, supabaseApiKey)
    return client
}