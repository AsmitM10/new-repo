"use client"

import { useEffect, useState } from "react"
import {
  Copy,
  LogOut,
  Users,
  HelpCircle,
  Home,
  Play,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AttendanceTracker from "@/components/landing/AttendanceTracker"
import { createClient } from "@supabase/supabase-js"

/* =========================
   Supabase
========================= */
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
  const [activeTab, setActiveTab] = useState<"invite" | "attendance">("invite")
  const [activeSection, setActiveSection] = useState<"home" | "referrals" | "faqs">("home")
  const [copied, setCopied] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const userName = data.username
  const referralLink = `https://bsfitness/dashboard/${data.userpage_slug}`

  /* =========================
     Attendance Helpers
  ========================= */
  const getTodayIndex = () => {
    const start = new Date(data.created_at).getTime()
    return Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24))
  }

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

      if (changed) {
        await supabase
          .from("user4")
          .update({ attendance })
          .eq("userpage_slug", data.userpage_slug)
      }
    }

    syncAttendance()
  }, [data])

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
    const message = `Join Bright Star Fitness and get FREE 7 Days Sessions!\n${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank")
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
     UI (OLD DESIGN)
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg z-20">
        <div className="p-6 border-b flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold">{userName}</span>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveSection("home")}
          >
            <Home className="w-4 h-4 mr-3" /> Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveSection("faqs")}
          >
            <HelpCircle className="w-4 h-4 mr-3" /> FAQs
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut className="w-4 h-4 mr-3" /> Logout
          </Button>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        {/* Live Session Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-48">
            <img src="/images/utube.jpg" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center p-6">
              <Button className="bg-red-600" onClick={markTodayPresent}>
                <Play className="w-4 h-4 mr-2" /> Join Live
              </Button>
            </div>
          </div>
        </Card>

        {activeSection === "home" && (
          <>
            {/* Tabs */}
            <div className="mb-6 border-b">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("invite")}
                  className={activeTab === "invite" ? "border-b-2 border-teal-600 pb-2" : "pb-2"}
                >
                  Invite Friends
                </button>
                <button
                  onClick={() => setActiveTab("attendance")}
                  className={activeTab === "attendance" ? "border-b-2 border-teal-600 pb-2" : "pb-2"}
                >
                  My Attendance
                </button>
              </div>
            </div>

            {activeTab === "invite" && (
              <Card className="p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Invite Friends</h3>
                <p className="text-gray-600 mb-6">Friends get FREE 7 Days Sessions</p>

                <div className="flex items-center gap-3">
                  <div className="flex-1 border rounded p-3 font-mono text-sm">
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
            )}

            {activeTab === "attendance" && (
              <Card className="p-8 shadow-lg">
                <AttendanceTracker attendance={data.attendance || []} />
              </Card>
            )}
          </>
        )}

        {activeSection === "faqs" && (
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardContent>
                  <button
                    className="w-full flex justify-between py-3"
                    onClick={() => setExpandedFAQ(i === expandedFAQ ? null : i)}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {expandedFAQ === i ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {expandedFAQ === i && <p className="mt-2">{faq.answer}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">
            <p className="mb-4 font-semibold">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
                No
              </Button>
              <Button onClick={() => (window.location.href = "/")}>Yes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
