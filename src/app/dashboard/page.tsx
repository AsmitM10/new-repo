"use client"

import { useState, useEffect } from "react"
import { Copy, LogOut, Users, HelpCircle, Home, Play, ChevronDown, ChevronUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AttendanceTracker from "@/components/landing/AttendanceTracker"
import {

  CardHeader,
  CardTitle

} from "@/components/ui/card"

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState("invite")
  const [activeSection, setActiveSection] = useState("home")
  const [copied, setCopied] = useState(false)
  const [userName, setUserName] = useState("User")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [referrals, setReferrals] = useState<Array<{ name: string; status: string; joinedAt?: string }>>([])
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
      const referralKey = `referrals_${storedName.replace(/\s+/g, "_")}`
      const storedReferrals = JSON.parse(localStorage.getItem(referralKey) || "[]")
      setReferrals(storedReferrals)
    }
  }, [])

  const referralLink = `https://bsfitness/${userName.replace(/\s+/g, "_")}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const handleWhatsAppShare = () => {
    const message = `Join Bright Star Fitness and get FREE 3 Days Sessions! Use my referral link: ${referralLink}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "What is the 7-day free online fitness session?",
      answer: "Our 7-day free online fitness session is a comprehensive program...",
    },
    {
      question: "How do I register for the free 7-day program?",
      answer: "Registration is simple! Just fill out the join form...",
    },
    {
      question: "Do I need to pay anything to join the 7-day trial?",
      answer: "No, the 7-day trial is completely free!",
    },
    {
      question: "Can I join from anywhere in the world?",
      answer: "Yes! Our online sessions are accessible from anywhere with internet.",
    },
    {
      question: "What kind of workouts are included in the 7-day session?",
      answer: "The program includes strength training, cardio, yoga, flexibility...",
    },
    {
      question: "Do I need to install any app?",
      answer: "No, you can join directly from the website via your dashboard.",
    },
    {
      question: "Can I share the session link with my friends or family?",
      answer: "Yes! Use the referral system in your dashboard.",
    },
  ]

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem(`referrals_${userName.replace(/\s+/g, "_")}`)
    window.location.href = "/"
  }

  const handleLogoutCancel = () => {
    setShowLogoutModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg z-20">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <span className="font-semibold text-gray-800">{userName}</span>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <Button
              variant={activeSection === "home" ? "default" : "ghost"}
              className={`w-full justify-start ${activeSection === "home" ? "bg-teal-600 hover:bg-teal-700 text-white" : "text-gray-600"}`}
              onClick={() => setActiveSection("home")}
            >
              <Home className="w-4 h-4 mr-3" /> Home
            </Button>
            <Button
              variant={activeSection === "referrals" ? "default" : "ghost"}
              className={`w-full justify-start ${activeSection === "referrals" ? "bg-teal-600 hover:bg-teal-700 text-white" : "text-gray-600"}`}
              onClick={() => setActiveSection("referrals")}
            >
              <Users className="w-4 h-4 mr-3" /> Referrals
            </Button>
            <Button
              variant={activeSection === "faqs" ? "default" : "ghost"}
              className={`w-full justify-start ${activeSection === "faqs" ? "bg-teal-600 hover:bg-teal-700 text-white" : "text-gray-600"}`}
              onClick={() => setActiveSection("faqs")}
            >
              <HelpCircle className="w-4 h-4 mr-3" /> FAQs
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600" onClick={handleLogoutClick}>
              <LogOut className="w-4 h-4 mr-3" /> Logout
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        {/* Live Fitness Sessions Card */}
        <Card className="mb-8 overflow-hidden w-130">
          <div className="relative h-48 ">
            <img
              src="/images/utube.jpg"
              alt="Live Fitness Sessions"
              className="w-130 h-full object-cover opacity-80"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-between p-6">
              <div>
                <h2 className="text-white text-2xl font-bold mb-2">Live Fitness Sessions</h2>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-4 h-4 mr-3 items-baseline" /> Join Now
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Sections */}
        {activeSection === "home" && (
          <>
            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("invite")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "invite"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    Invite Friends
                  </button>
                  <button
                    onClick={() => setActiveTab("attendance")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "attendance"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    My Attendance
                  </button>
                </nav>
              </div>
            </div>

            {activeTab === "invite" && (
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">INVITE FRIENDS</h3>
                <p className="text-gray-600 mb-6">Friends will also get FREE 3 Days Sessions</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-gray-800 font-mono text-sm">{referralLink}</span>
                      {/* Copy Button inside the referral link card */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="ml-2 p-1 h-8 w-8 hover:bg-gray-100"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </Button>
                    </div>

                    {/* WhatsApp Button remains separate */}
                    <Button
                      onClick={handleWhatsAppShare}
                      className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      Share on Whatsapp
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <AttendanceTracker />
              </div>
            )}
          </>
        )}

        {activeSection === "referrals" && (
           <Card className="bg-white shadow-md rounded-xl p-4">
           <CardHeader>
              <CardTitle className="text-teal-800  "><b>List of Referrals</b></CardTitle>
            </CardHeader>
         
           
            <CardContent>
              <p className="text-teal-800">
                No referrals yet. Share your link to start earning referrals!
              </p>
            </CardContent>
          </Card>


        )}

        {activeSection === "faqs" && (
          <div className="max-w-4xl space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-white shadow-md hover:shadow-lg rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02]"
              >

                <CardContent>
                  <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center py-3">
                    <span className="font-semibold text-teal-800">{faq.question}</span>
                    {expandedFAQ === index ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {expandedFAQ === index && <p className="mt-2 text-teal-800 animate-fade-in">{faq.answer}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Logout Modal (only covers main content, sidebar visible) */}
        {showLogoutModal && (
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white opacity-100 rounded-2xl p-8 h-50 max-w-md w-full mx-4 shadow-2xl  border-black-2px">
              <div className="text-center">
                <p className="text-lg text-teal-800 mb-5 mt-5 text-center  ">
                  <b>Are you sure you want to Logout?</b>
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={handleLogoutCancel}>
                    No
                  </Button>
                  <Button onClick={handleLogoutConfirm} className="bg-teal-600 hover:bg-teal-700 text-white">
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
