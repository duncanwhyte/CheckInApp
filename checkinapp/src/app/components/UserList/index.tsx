"use client"
import { useState, useEffect } from "react";
import UserCard from "../UserCard"
import type { User } from "./types";
import supabaseClient from "@/app/utils/createSupabaseClient";
import { useRouter } from "next/navigation";

export default function UserList({data}: {data : User[]}) {
    const supabase = supabaseClient();
    const router = useRouter()
    const [users, setUsers] = useState<User[] | []>(data)
    const navigateToCheckIn = (id: number) => {
      router.push(`/checkin/${id}`)
    }
    useEffect(() => {
      const realtimeUsers = supabase.channel("realtime-users").on("postgres_changes", {event: "*", schema: "public", table: "users"}, (payload) => {
        setUsers([...payload.new as User[]])
      }).subscribe()
      return () => {
        supabase.removeChannel(realtimeUsers)
      }
    }, [supabase])
    return (
        <ul className="flex flex-col items-center">
            {users?.map(({id, name, avatar, jobTitle, present}) => <li onClick={() => navigateToCheckIn(id)} key={id}>{<UserCard id={id} name={name} avatar={avatar} jobTitle={jobTitle} present={present} />}</li>)}
        </ul>
    )
}