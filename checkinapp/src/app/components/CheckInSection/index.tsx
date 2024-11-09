"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import supabaseClient from "@/app/utils/createSupabaseClient"
import type { User } from "../UserList/types"
import UserCard from "../UserCard"
import CtaButton from "../CtaButton"
export default function CheckInSection() {
    const {userId} = useParams();
    const supabase = supabaseClient();
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const handleUserArrival = (arrival: boolean) => {
        supabase.from("users").update({present: arrival}).eq("id", userId).select();
        setUser((prevState) => {
            return {
                ...prevState,
                present: arrival
            }
        })
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const {data, error} = await supabase.from("users").update({"present": true}).eq("id", userId).select();
                setUser(data[0])
                setIsLoading(false)
            } catch (error) {
                setError(true);
            }
        }
        fetchUser();
    }, [])
    return (
        <div>
            {!isLoading && user && <UserCard id={user.id} name={user.name} avatar={user.avatar} jobTitle={user.jobTitle} present={user.present} />}
                <div className="">
                    <CtaButton arrival={true} callback={handleUserArrival} buttonName={"Arrive"}/>
                    <CtaButton arrival={false} callback={handleUserArrival} buttonName={"Depart"} />
                </div>
        </div>
    )
}