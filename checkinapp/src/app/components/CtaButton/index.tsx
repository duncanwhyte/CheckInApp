export default function CtaButton({buttonName, handleUserAttendance, arrival} : {buttonName: string, handleUserAttendance: (arrival: boolean) => void, arrival: boolean}) {
    return (
        <button onClick={() => handleUserAttendance(arrival)} className="bg-[#005CBE] text-white p-2 border rounded-md">{buttonName}</button>
    )
}