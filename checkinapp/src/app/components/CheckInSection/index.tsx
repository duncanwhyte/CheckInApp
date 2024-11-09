"use client"
import {useRouter} from "next/navigation"
import { useState ,useEffect } from "react"
import supabaseClient from "@/app/utils/createSupabaseClient"
import UserCard from "../UserCard"
import CtaButton from "../CtaButton"
import type { User } from "../UserList/types"
export default function CheckInSection({data} : {data: User}) {
    const supabase = supabaseClient();
    const [user, setUser] = useState(data)
    const router = useRouter();
    const handleUserAttendance = async (arrival: boolean) => {
        if (user.present === arrival) {
            return
        }
        await supabase.from("users").update({"present": `${arrival}`}).eq("id", data.id).select();
        router.push("/")
    }
    useEffect(() => {
        const userChannel = supabase.channel("user-channel").on("postgres_changes", {
            event: "UPDATE",
            schema: "public",
            table: "users"
        }, (payload) => {
            setUser(payload.new as User)
        }).subscribe()
        return () => {
            supabase.removeChannel(userChannel)
        }
    },  [data, user, setUser])
    return (
        <div>
            {user && <UserCard id={user.id} name={user.name} avatar={user.avatar} jobTitle={user.jobTitle} present={user.present} />}
                <>
                    <CtaButton arrival={true} handleUserAttendance={handleUserAttendance} buttonName={"Arrive"}/>
                    <CtaButton arrival={false} handleUserAttendance={handleUserAttendance} buttonName={"Depart"} />
                </>
        </div>
    )
}