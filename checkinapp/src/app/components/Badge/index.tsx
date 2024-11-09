
export default function Badge({present} : {present: boolean}) {
    return (
        <div className={`min-w-[75px] flex justify-center items-center p-1 ${present ? "bg-green-500" : "bg-red-500"} rounded-md`}>
            <p className="text-white">{present ? "Present" : "Absent"}</p>
        </div>
    )

}