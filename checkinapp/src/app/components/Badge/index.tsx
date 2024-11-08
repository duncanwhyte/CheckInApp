
export default function Badge({present} : {present: boolean}) {
    return (
        <div className={`flex justify-center items-center ${present ? "bg-green-500" : "bg-red-500"} w-8 h-8 rounded-full`}>
            <p className="text-white">{present ? "P" : "A"}</p>
        </div>
    )

}