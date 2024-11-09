"use client"
import { useState, useEffect } from "react";
import UserCard from "../UserCard"
import type { User } from "./types";
import supabaseClient from "@/app/utils/createSupabaseClient";

export default function UserList({data}) {
    const supabase = supabaseClient();
    const [users, setUsers] = useState<User[] | []>(data)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
      supabase.channel("realtime users").on("postgres_changes", {event: "UPDATE", schema: "public", table: "users"}, (payload) => {
        console.log(payload)
      }).subscribe()
    }, [])
    return (
        <ul className="flex flex-col items-center">
            {!isLoading && users && users.map(({id, name, avatar, jobTitle, present}) => <li key={id}>{<UserCard id={id} name={name} avatar={avatar} jobTitle={jobTitle} present={present} />}</li>)}
        </ul>
    )
}