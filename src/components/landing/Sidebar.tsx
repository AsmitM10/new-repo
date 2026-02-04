"use client"

import { Home, Users, HelpCircle, LogOut } from "lucide-react"
import { useState } from "react"

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home")

  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5 mr-3" /> },
    { id: "referrals", label: "Referrals", icon: <Users className="w-5 h-5 mr-3" /> },
    { id: "faqs", label: "FAQs", icon: <HelpCircle className="w-5 h-5 mr-3" /> },
    { id: "logout", label: "Logout", icon: <LogOut className="w-5 h-5 mr-3" /> },
  ]

  return (
    <aside className="w-64 h-screen bg-white border-r p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
          U
        </div>
        <span className="text-gray-800 font-medium">User</span>
      </div>

      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeSection === item.id
                ? "bg-teal-600 text-white"
                : "text-gray-700 hover:bg-teal-800 hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
