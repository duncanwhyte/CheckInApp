import UserList from "./components/UserList";
import supabaseClient from "./utils/createSupabaseClient";

export default async function Home() {
  const supabase = supabaseClient();
  const {data: users} = await supabase.from("users").select();
  return (
    <main className="px-6">
      <UserList data={users || []} />
    </main>
  );
}
