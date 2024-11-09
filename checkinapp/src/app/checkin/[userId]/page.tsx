import CheckInSection from "@/app/components/CheckInSection";
import supabaseClient from "@/app/utils/createSupabaseClient";
export default async function CheckinPage({params}) {
    const userId = (await params).userId
    const supabase = supabaseClient();
    const {data: user} = await supabase.from("users").select().eq("id", userId)
    return (
        <main className="px-6">
            {user && <CheckInSection data={user[0]} />}
        </main>
    )
}