"use client"

import { useEffect, useState } from "react"
import {
  Copy,
  LogOut,
  HelpCircle,
  Home,
  Play,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AttendanceTracker from "@/components/landing/AttendanceTracker"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* =========================
   Types
========================= */
type UserData = {
  id: number
  username: string
  userpage_slug: string
  attendance: string[] | null
  created_at: string
}

/* =========================
   Component
========================= */
export default function MemberDashboard({ data }: { data: UserData }) {
  const [activeSection, setActiveSection] = useState<"home" | "faqs">("home")
  const [copied, setCopied] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  /* =========================
     Derived values
  ========================= */
  const userName = data.username
  const referralLink = `https://bsfitness/dashboard/${data.userpage_slug}`

  /* =========================
     Attendance helpers
  ========================= */
  const getTodayIndex = () => {
    const start = new Date(data.created_at).getTime()
    return Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24))
  }

  /* =========================
     Auto mark ABSENT
  ========================= */
  useEffect(() => {
    const syncAttendance = async () => {
      const daysPassed = getTodayIndex()
      const attendance = [...(data.attendance || [])]
      let changed = false

      for (let i = 0; i < daysPassed; i++) {
        if (!attendance[i]) {
          attendance[i] = "A"
          changed = true
        }
      }

      if (!changed) return

      await supabase
        .from("user4")
        .update({ attendance })
        .eq("userpage_slug", data.userpage_slug)
    }

    syncAttendance()
  }, [data.userpage_slug, data.created_at])

  /* =========================
     Mark TODAY PRESENT
  ========================= */
  const markTodayPresent = async () => {
    const todayIndex = getTodayIndex()
    const attendance = [...(data.attendance || [])]

    if (attendance[todayIndex]) return

    attendance[todayIndex] = "P"

    await supabase
      .from("user4")
      .update({ attendance })
      .eq("userpage_slug", data.userpage_slug)
  }

  /* =========================
     Actions
  ========================= */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const msg = `Join Bright Star Fitness and get FREE 7 Days Sessions!\n${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const handleLogoutConfirm = () => {
    window.location.href = "/"
  }

  /* =========================
     FAQ
  ========================= */
  const faqs = [
    {
      question: "What is the 7-day free online fitness session?",
      answer: "It’s a guided online fitness program with live workouts.",
    },
    {
      question: "Is the trial really free?",
      answer: "Yes, no payment is required.",
    },
  ]

  /* =========================
     UI (UNCHANGED)
  ========================= */
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-600 text-white flex items-center justify-center rounded-full">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold">{userName}</span>
        </div>

        <nav className="p-4 space-y-2">
          <Button className="w-full justify-start" onClick={() => setActiveSection("home")}>
            <Home className="w-4 h-4 mr-2" /> Home
          </Button>
          <Button className="w-full justify-start" onClick={() => setActiveSection("faqs")}>
            <HelpCircle className="w-4 h-4 mr-2" /> FAQs
          </Button>
          <Button className="w-full justify-start" onClick={() => setShowLogoutModal(true)}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <Card className="mb-6 overflow-hidden">
          <div className="relative h-48">
            <img src="/images/utube.jpg" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center p-6">
              <Button className="bg-red-600" onClick={markTodayPresent}>
                <Play className="w-4 h-4 mr-2" /> Join Live
              </Button>
            </div>
          </div>
        </Card>

        {activeSection === "home" && (
          <>
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Invite Friends</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 border p-2 rounded">
                  {referralLink}
                </div>
                <Button onClick={handleCopy}>
                  {copied ? <Check /> : <Copy />}
                </Button>
                <Button onClick={handleWhatsAppShare} className="bg-green-600">
                  WhatsApp
                </Button>
              </div>
            </Card>

            <AttendanceTracker attendance={data.attendance || []} />
          </>
        )}

        {activeSection === "faqs" && (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardContent>
                  <button
                    className="w-full flex justify-between"
                    onClick={() => setExpandedFAQ(i === expandedFAQ ? null : i)}
                  >
                    {faq.question}
                    {expandedFAQ === i ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {expandedFAQ === i && <p className="mt-2">{faq.answer}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
                No
              </Button>
              <Button onClick={handleLogoutConfirm}>Yes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
