import { createSupabaseServerClient } from "@/lib/supabase/server"
import MemberDashboard from "./MemberDashboard"

export interface UserData {
  id: number
  username: string
  userpage_slug: string
  attendance: string[]
  created_at: string
}

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("user4")
    .select("*")
    .eq("userpage_slug", params.slug)
    .single()

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">User Not Found</p>
      </div>
    )
  }

  return <MemberDashboard data={data as UserData} />
}
