import { createSupabaseServerClient } from "@/lib/supabase/server"
import MemberDashboard from "./MemberDashboard"

export interface UserData {
  id: number
  username: string
  userpage_slug: string
  attendance: string[] | null
  created_at: string
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // ✅ unwrap params (THIS WAS THE BUG)
  const { slug } = await params

  console.log("PAGE HIT — SLUG:", slug)

  const supabase = await createSupabaseServerClient()
  console.log("SUPABASE CLIENT READY")

  const { data, error } = await supabase
    .from("user4")
    .select("*")
    .eq("userpage_slug", slug)

  console.log("SUPABASE DATA:", data)
  console.log("SUPABASE ERROR:", error)

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Error loading user</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">User Not Found</p>
      </div>
    )
  }

  return <MemberDashboard data={data[0] as UserData} />
}
