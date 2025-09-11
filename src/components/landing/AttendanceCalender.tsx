"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AttendanceDay {
  date: number
  day: string
  status: "present" | "not-marked" | "not-active"
}

export default function AttendanceCalendar() {
  const [attendanceData] = useState<AttendanceDay[]>([
    { date: 1, day: "Mon", status: "present" },
    { date: 2, day: "Tue", status: "not-marked" },
    { date: 3, day: "Wed", status: "not-marked" },
    { date: 4, day: "Thu", status: "not-marked" },
    { date: 5, day: "Fri", status: "not-marked" },
    { date: 6, day: "Sat", status: "not-marked" },
    { date: 7, day: "Sun", status: "not-marked" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-400 text-white"
      case "not-marked":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "not-active":
        return "bg-gray-300 text-gray-500"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const dayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">September 2025</h3>

      <motion.div className="grid grid-cols-7 gap-3" variants={containerVariants} initial="hidden" animate="visible">
        {attendanceData.map((day) => (
          <motion.div
            key={day.date}
            variants={dayVariants}
            className={`text-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${getStatusColor(day.status)}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xs font-medium mb-1">{day.day}</div>
            <div className="text-lg font-bold">{day.date.toString().padStart(2, "0")}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
          <span className="text-xs text-gray-600 font-medium">NOT MARKED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-teal-400 rounded-full"></div>
          <span className="text-xs text-gray-600 font-medium">PRESENT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <span className="text-xs text-gray-600 font-medium">NOT ACTIVE</span>
        </div>
      </div>
    </div>
  )
}
