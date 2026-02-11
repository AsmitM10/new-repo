"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import type { UserData } from "./page"

const DAYS = 7
const VALID = ["P", "A", "N"]

const normalizeAttendance = (arr?: string[]) => {
  const base = Array(DAYS).fill("N")

  if (!arr) return base

  for (let i = 0; i < Math.min(arr.length, DAYS); i++) {
    if (VALID.includes(arr[i])) {
      base[i] = arr[i]
    }
  }
  return base
}

const getActiveDayIndex = (createdAt: string) => {
  const start = new Date(createdAt)
  const today = new Date()

  const diff = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  )

  return Math.min(Math.max(diff, 0), DAYS - 1)
}

export default function MemberDashboard({ data }: { data: UserData }) {
  const supabase = createSupabaseBrowserClient()

  const [attendance, setAttendance] = useState<string[]>(
    normalizeAttendance(data.attendance)
  )

  // 🔒 One-time sync for past days
  useEffect(() => {
    const activeIndex = getActiveDayIndex(data.created_at)
    const updated = [...attendance]
    let changed = false

    for (let i = 0; i < activeIndex; i++) {
      if (updated[i] === "N") {
        updated[i] = "A"
        changed = true
      }
    }

    if (!changed) return

    setAttendance(updated)

    supabase
      .from("user4")
      .update({ attendance: updated })
      .eq("userpage_slug", data.userpage_slug)
  }, []) // ← DO NOT add dependencies

  const markPresent = async () => {
    const todayIndex = getActiveDayIndex(data.created_at)
    if (attendance[todayIndex] !== "N") return

    const updated = [...attendance]
    updated[todayIndex] = "P"

    setAttendance(updated)

    await supabase
      .from("user4")
      .update({ attendance: updated })
      .eq("userpage_slug", data.userpage_slug)
  }

  const getColor = (state: string) => {
    if (state === "P") return "bg-green-500"
    if (state === "A") return "bg-red-500"
    return "bg-white border"
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Welcome, {data.username}
      </h1>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {attendance.map((day, i) => (
          <div
            key={i}
            className={`h-10 w-10 rounded flex items-center justify-center ${getColor(
              day
            )}`}
          >
            {day}
          </div>
        ))}
      </div>

      <button
        onClick={markPresent}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Mark Today Present
      </button>
    </div>
  )
}
