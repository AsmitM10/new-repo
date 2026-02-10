import { createSupabaseServerClient } from "@/lib/supabase/server"
import MemberDashboard from "./MemberDashboard"

interface UserData {
  id: number
  username: string
  userpage_slug: string
  attendance: string[] | null
  created_at: string
}

export default async function UserPage({
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            User Not Found
          </h1>
          <p className="text-gray-600">
            The user profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  return <MemberDashboard data={data as UserData} />
}
