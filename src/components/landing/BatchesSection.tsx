"use client"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export default function BatchesSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="px-4 py-6 max-w-4xl mx-auto"
    >
      {/* Card wrapper with shadow */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-[64px] leading-[100%] font-semibold text-gray-900 font-sans">JOIN ANY BATCH</h2>
        <p className="text-[#1A8B79] leading-[100%] text-[35px] mt-1 font-sans">
          45 minutes classes, Indian Standard Time (IST)
        </p>

        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div>
              <h3 className="font-semibold flex items-center gap-2 font-sans text-lg">
                <Sun className="w-5 h-5" /> Morning Slot
              </h3>
              <ul className="mt-2 text-slate-700 dark:text-slate-300 list-disc list-inside space-y-2 font-sans">
                <li>6:30 A.M</li>
                <li>7:30 A.M</li>
                <li>8:30 A.M</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2 font-sans text-lg">
                <Moon className="w-5 h-5" /> Evening Slot
              </h3>
              <ul className="mt-2 text-slate-700 dark:text-slate-300 list-disc list-inside space-y-2 font-sans">
                <li>5:00 P.M</li>
                <li>6:00 P.M</li>
                <li>7:00 P.M</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
