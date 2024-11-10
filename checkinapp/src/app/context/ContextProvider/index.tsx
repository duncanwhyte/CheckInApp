"use client"
import { SupabaseContext } from "@/app/context/context";
import supabaseClient from "@/app/utils/createSupabaseClient";

export default function ContextProvider({children}: {children: React.ReactNode}) {
    const supabase = supabaseClient()
      return (
        <SupabaseContext.Provider value={{supabase}}>
            {children}
        </SupabaseContext.Provider>
      )
}