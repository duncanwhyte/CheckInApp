"use client"
import { useState, useEffect } from "react";
import UserCard from "../UserCard"
import type { User } from "./types";
import supabaseClient from "@/app/utils/createSupabaseClient";
import { useRouter } from "next/navigation";

export default function UserList({data}) {
    const supabase = supabaseClient();
    const router = useRouter()
    const [users, setUsers] = useState<User[] | []>(data)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigateToCheckIn = (id) => {
      router.push(`/checkin/${id}`)
    }
    useEffect(() => {
      const realtimeUsers = supabase.channel("realtime-users").on("postgres_changes", {event: "*", schema: "public", table: "users"}, (payload) => {
        console.log(payload)
      }).subscribe()
      return () => {
        supabase.removeChannel(realtimeUsers)
      }
    }, [supabase])
    return (
        <ul className="flex flex-col items-center">
            {!isLoading && users && users.map(({id, name, avatar, jobTitle, present}) => <li onClick={() => navigateToCheckIn(id)} key={id}>{<UserCard id={id} name={name} avatar={avatar} jobTitle={jobTitle} present={present} />}</li>)}
        </ul>
    )
}