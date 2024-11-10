"use client"
import { useState } from "react";
import { defaultState, StateContext } from "@/app/context/context";
export default function ContextProvider({children}: {children: React.ReactNode}) {
    const [stateData, setStateData] = useState(defaultState)
      return (
        <StateContext.Provider value={defaultState}>
            {children}
        </StateContext.Provider>
      )
}