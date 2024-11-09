export default function CtaButton({buttonName, handleUserAttendance, arrival} : {buttonName: string, handleUserAttendance: (arrival: boolean) => void, arrival: boolean}) {
    return (
        <button onClick={() => handleUserAttendance(arrival)} className="p-2 border rounded-3xl">{buttonName}</button>
    )
}