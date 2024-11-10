"use client"
import { useState, useEffect, useContext } from "react";
import UserCard from "../UserCard"
import type { User } from "../../types/types";
import { useRouter } from "next/navigation";
import { StateContext } from "@/app/context/context";
import UserForm from "../UserForm";
import NewUserButton from "../NewUserButton";

export default function UserList({data}: {data : User[]}) {
    const {supabase} = useContext(StateContext)
    const [showForm, setShowForm] = useState(false)
    const router = useRouter()
    const [users, setUsers] = useState<User[] | []>(data)
    const navigateToCheckIn = (id: number) => {
      router.push(`/checkin/${id}`)
    }
    const handleShowForm = () => {
      setShowForm(!showForm)
    }
    useEffect(() => {
      const realtimeUsers = supabase.channel("realtime-users").on("postgres_changes", {event: "*", schema: "public", table: "users"}, (payload) => {
        setUsers([...users, payload.new as User])
      }).subscribe()
      return () => {
        supabase.removeChannel(realtimeUsers)
      }
    }, [supabase])
    return (
      <div className="relative">
        <NewUserButton handleShowForm={handleShowForm} />
        <UserForm showForm={showForm} handleShowForm={handleShowForm} />
        <ul className="flex flex-col items-center">
            {users?.map(({id, name, avatar, jobTitle, present}) => <li onClick={() => navigateToCheckIn(id)} key={id}>{<UserCard id={id} name={name} avatar={avatar} jobTitle={jobTitle} present={present} />}</li>)}
        </ul>
        </div>
    )
}