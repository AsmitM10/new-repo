
// //
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function JoinFormSection() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [referrerName, setReferrerName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Extract referral name from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const referrer = urlParams.get("ref");
      if (referrer) {
        setReferrerName(referrer.replace(/_/g, " "));
      }
    }
  }, []);

  // Validate WhatsApp number (Indian format)
  const validateWhatsApp = (number: string): boolean => {
    const cleanNumber = number.replace(/\D/g, "");
    return cleanNumber.length === 10 && /^[6-9]\d{9}$/.test(cleanNumber);
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setWhatsapp(value);
    }
  };

  // ✅ Handle Form Submit
// ✅ Handle Form Submit
// ✅ Handle Form Submit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setMessage("")

  // 🔒 Validation (logic only)
  if (!validateWhatsApp(whatsapp)) {
    setMessage("❌ Enter a valid 10-digit WhatsApp number")
    return
  }

  setIsSubmitting(true)

 try {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: name.trim(),
      whatsapp_no: whatsapp,

      referrer_name: referrerName ?? null,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error("API ERROR:", data)
    throw new Error(data.error || "Failed")
  }

  const { slug } = data

  const telegramBot = "brightstarfitness_bot"

const telegramLink = `https://t.me/${telegramBot}?text=verify_${slug}`


} catch (err: any) {
  setMessage(`❌ ${err.message}`)
}
 finally {
    setIsSubmitting(false)
  }
}



  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="px-4 py-8 max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Join Our 7-Day Program
        </h2>
        <p className="text-gray-600">
          Transform your life with our exclusive program
        </p>
      </div>

      {referrerName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg text-center shadow-sm"
        >
          <p className="text-teal-700 font-medium">
            🎉 You're joining through <strong>{referrerName}</strong>'s referral! You'll
            get <span className="text-teal-800 font-bold">FREE 3 Days Sessions!</span>
          </p>
        </motion.div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Name Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-white text-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* WhatsApp Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img
                    src="https://flagcdn.com/w20/in.png"
                    alt="India"
                    className="w-5 h-4 mr-2"
                  />
                  <span className="font-medium text-gray-700">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-white text-gray-700"
                  value={whatsapp}
                  onChange={handleWhatsAppChange}
                  maxLength={10}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-3 font-medium bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Registering...
                </div>
              ) : (
                "Join Our Program"
              )}
            </Button>
          </div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg text-center font-medium ${
                message.includes("✅")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </motion.div>
          )}
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            After registration, you'll be redirected to WhatsApp to verify your account
            with our admin.
          </p>
        </div>
      </div>
    </motion.section>
  );
}


