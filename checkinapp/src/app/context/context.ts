import { createContext } from "react";
import supabaseClient from "../utils/createSupabaseClient";

const supabase = supabaseClient()
export const defaultSupabase = {
    supabase,
}
export const SupabaseContext = createContext(defaultSupabase)
