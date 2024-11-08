"use client"
import { useState, useEffect } from "react";
import UserCard from "../UserCard"
import type { User } from "./types";
import supabaseClient from "@/app/utils/createSupabaseClient";

export default function UserList() {
    const supabase = supabaseClient();
    const [users, setUsers] = useState<User[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    
        useEffect(() => {
      const fetchUsers = async () => {
        try {
          setIsLoading(true);
          const {data, error} = await supabase.from("users").select();
          setUsers(data)
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
      fetchUsers()
    }, [])
    return (
        <ul className="flex flex-col items-center">
            {!isLoading && users && users.map(({id, name, avatar, jobTitle, present}) => <UserCard key={id} name={name} avatar={avatar} jobTitle={jobTitle} present={present} />)}
        </ul>
    )
}