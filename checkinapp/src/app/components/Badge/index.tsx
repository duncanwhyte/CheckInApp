export default function Badge({present}) {
    return (
        <div className={`${present ? "bg-green-500" : "bg-red-500"}`}>
            <p className="text-white">{present ? "P" : "A"}</p>
        </div>
    )

}