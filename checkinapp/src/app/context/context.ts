import { createContext } from "react";
import supabaseClient from "../utils/createSupabaseClient";

const supabase = supabaseClient()
export const defaultState = {
    supabase,
}
export const StateContext = createContext(defaultState)
