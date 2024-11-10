"use client"
import Image from "next/image"
import Badge from "../Badge"
import type { User } from "../../types/types"
export default function UserCard({name, avatar, jobTitle, present} : User) {
    return (
            <div className="min-w-[350px] mb-4 border border-solid border-black px-4 py-2 rounded-xl">
                <div className="flex justify-between items-center">
                <div className="flex">
                    <div>
                    <Image width={32} height={32} src={avatar} alt="Avatar representing user"/>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-[#005CBE]">{name}</h3>
                        <p className="text-xs">{jobTitle}</p>
                    </div>
                </div>
                <div>
                    <Badge present={present} />
                </div>
                </div>
            </div>
    )
    
}