"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [error, setError] = useState("")
  const [showReferralLink, setShowReferralLink] = useState(false)
  const [referralLink, setReferralLink] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (!name.trim() || !whatsapp.trim()) {
      setError("Please fill in all fields")
      return
    }

    // Check if user is registered
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const user = registeredUsers.find(
      (u: any) => u.name.toLowerCase() === name.toLowerCase() && u.whatsapp === whatsapp,
    )

    if (user) {
      // Store current user session
      localStorage.setItem("currentUser", JSON.stringify(user))

      const userReferralLink = `https://bsfitness/${user.name.replace(/\s+/g, "_")}`
      setReferralLink(userReferralLink)
      setShowReferralLink(true)

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } else {
      setError("User not found. Please register first or check your credentials.")
    }
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    alert("Referral link copied to clipboard!")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#F5F6FA] bg-opacity-50 w-600px rounded-2xl border-1px border-black gap-40px r-20px h-300px flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        {showReferralLink ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">
              <b>Login Successful!</b>
            </h2>
            <p className="text-teal-700 mb-4">Your personal referral link:</p>
            <div className="bg-gray-100 p-3 rounded-md mb-4 break-all text-sm">{referralLink}</div>
            <Button onClick={copyReferralLink} className="w-full bg-teal-800 hover:bg-teal-700 text-white mb-3">
              <b>Copy Referral Link</b>
            </Button>
            <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
              <b>Login</b>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-teal-800 mb-2">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-teal-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-teal-800"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-800 mb-2">
                  <b>WhatsApp Number</b>
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 border border-teal-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800 text-teal-800"
                  placeholder="Enter your WhatsApp number"
                />
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              <div className="flex gap-3 pt-4">
                <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent text-teal-800">
                  <b>Cancel</b>
                </Button>
                <Button
                  onClick={handleLogin}
                  className="flex-1 bg-teal-800 hover:bg-teal-800 text-white border-1px border-black"
                >
                  <b>Login</b>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
