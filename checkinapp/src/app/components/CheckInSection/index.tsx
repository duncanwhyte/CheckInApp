"use client"
import {useRouter} from "next/navigation"
import { useState ,useEffect } from "react"
import supabaseClient from "@/app/utils/createSupabaseClient"
import UserCard from "../UserCard"
import CtaButton from "../CtaButton"
import type { User } from "../../types/types"
import BackToUsersButton from "../BackToUsersButton"
export default function CheckInSection({data} : {data: User}) {
    const supabase = supabaseClient();
    const [user, setUser] = useState(data)
    const [error, setError] = useState(false)
    const router = useRouter();
    const handleUserPageNavigation = () => {
        router.push("/")
    }
    const handleUserAttendance = async (arrival: boolean) => {
        try {
            if (user.present === arrival) {
                return
            }
            await supabase.from("users").update({"present": arrival}).eq("id", data.id).select();
            router.push("/")
        } catch (error) {
            setError(true)
        }
    }
    useEffect(() => {
        const userChannel = supabase.channel("user-channel").on("postgres_changes", {
            event: "*",
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
        <div className="flex flex-col items-center">
            <BackToUsersButton handleUserPageNavigation={handleUserPageNavigation} />
        {!error && user ? <UserCard name={user.name} avatar={user.avatar} jobTitle={user.jobTitle} present={user.present} /> : <h2>Error has Occurred</h2>}
                <div className="flex justify-center items-center">
                    <CtaButton arrival={true} handleUserAttendance={handleUserAttendance} buttonName={"Arrive"}/>
                    <CtaButton arrival={false} handleUserAttendance={handleUserAttendance} buttonName={"Depart"} />
                </div>
        </div>
    )
}