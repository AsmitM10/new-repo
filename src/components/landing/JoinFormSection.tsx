"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient";

export default function JoinFormSection() {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [referrerName, setReferrerName] = useState<string | null>(null)
  const router = useRouter()

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const referrer = urlParams.get("ref")
    if (referrer) {
      setReferrerName(referrer.replace(/_/g, " "))
    }
  }, [])

 const handleJoinGroup = async () => {
  if (name.trim() && whatsapp.trim()) {
    // insert into supabase
    const { data, error } = await supabase.from("user4").insert([
      {
        username: name.trim(),
        whatsapp_no: whatsapp.trim(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      alert("Error: " + error.message);
      return;
    }

    console.log("User registered:", data);

    // redirect user to WhatsApp with prefilled VERIFY message
    const adminNumber = "91xxxxxxxxxx"; // replace with your admin’s WhatsApp number
    const waLink = `https://wa.me/${adminNumber}?text=VERIFY`;
    window.location.href = waLink;
  } else {
    alert("Please fill in all fields");
  }
};

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="px-4 py-4 max-w-4xl mx-auto"
    >
      {referrerName && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-center shadow-sm">
          <p className="text-teal-700">
            🎉 You're joining through <strong>{referrerName}'s</strong> referral! You'll get FREE 3 Days Sessions!
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch">
          <div className="flex-1">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 h-12 bg-white">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter your name"
                className="flex-1 outline-none bg-transparent font-sans text-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 h-12 bg-white">
              <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 h-4 mr-2" />
              <span className="font-medium text-gray-700 mr-3">+91</span>
              <input
                type="text"
                placeholder="Whatsapp Number"
                className="flex-1 outline-none bg-transparent font-sans text-gray-700"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 md:flex-none md:w-48">
            <Button
              className="w-full h-12 font-sans font-medium bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 !text-white border-0 rounded-lg shadow-sm"
              onClick={handleJoinGroup}
            >
              Join Our Group
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
