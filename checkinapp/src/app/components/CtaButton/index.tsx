export default function CtaButton({buttonName, callback, arrival} : {buttonName: string, callback: () => void, arrival: boolean}) {
    return (
        <button onClick={() => callback(arrival)} className="p-2 border rounded-3xl">{buttonName}</button>
    )
}