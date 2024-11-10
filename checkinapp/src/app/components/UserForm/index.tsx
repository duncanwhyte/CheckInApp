"use client"
import { useContext, useState } from "react"
import { faker } from "@faker-js/faker";
import { SupabaseContext } from "@/app/context/context";
export default function UserForm({showForm, handleShowForm} : {showForm: boolean, handleShowForm: () => void}) {
    const [userData, setUserData] = useState({
        name: "",
        jobTitle: "",
    })
    const {supabase} = useContext(SupabaseContext)
    const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, jobTitle} = userData
        if (!name && !jobTitle) {
            return
        }
        const newUser = [{
            "id": faker.number.int({min: 1000000}),
            "name": name,
            "avatar": faker.image.avatar(),
            "jobTitle": jobTitle,
            "present" : true
        }
    ]
        if (name && jobTitle) {
            await supabase.from("users").insert(newUser).select()
        }
        setUserData({
            name: "",
            jobTitle: ""
        })
        handleShowForm()
    }
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUserData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    return (
        <form className={`flex flex-col items-center bg-[#005CBE] px-5 py-3 rounded-xl max-w-[70%] transition-all left-1/2 -translate-x-1/2 absolute ${showForm ? "-translate-y-0" : "-translate-y-96"}`} onSubmit={handleUserSubmit}>
            <h2 className="text-2xl mb-3 text-white self-start">Check In</h2>
            <div className="mb-3">
            <label className="block text-white" htmlFor="name">Name</label>
            <input className="block max-w-xs rounded-lg border-none focus:outline-none" onChange={handleFormChange} name="name" type="text" value={userData.name}/>
            </div>
            <div className="mb-6">
            <label className="block text-white" htmlFor="jobTitle">Job title</label>
            <input className="block max-w-xs rounded-lg border-none focus:outline-none" onChange={handleFormChange} name="jobTitle" type="text" value={userData.jobTitle}/>
            </div>
            <button className="bg-white w-full text-sm p-1 rounded-lg">Check In</button>
        </form>
    )
}