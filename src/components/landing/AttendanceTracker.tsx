"use client"

import { useState, useEffect } from "react"

interface AttendanceData {
  [date: string]: "present" | "absent" | "not-marked"
}

export default function AttendanceTracker() {
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({})
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    // Load attendance data from localStorage
    const storedAttendance = localStorage.getItem("fitnessAttendance")
    if (storedAttendance) {
      setAttendanceData(JSON.parse(storedAttendance))
    }
  }, [])

  const saveAttendance = (newData: AttendanceData) => {
    setAttendanceData(newData)
    localStorage.setItem("fitnessAttendance", JSON.stringify(newData))
  }

  const markAttendance = (date: string, status: "present" | "absent") => {
    const newData = { ...attendanceData, [date]: status }
    saveAttendance(newData)
  }

  const toggleAttendance = (date: string) => {
    const currentStatus = attendanceData[date] || "not-marked"
    let newStatus: "present" | "absent"

    if (currentStatus === "not-marked" || currentStatus === "absent") {
      newStatus = "present"
    } else {
      newStatus = "absent"
    }

    markAttendance(date, newStatus)
  }

  const getDateString = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const getSevenDays = () => {
    const today = new Date()
    const days = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    return days
  }

  const getAttendanceStats = () => {
    const totalDays = Object.keys(attendanceData).length
    const presentDays = Object.values(attendanceData).filter((status) => status === "present").length
    const challengeDays = 7 // 7-day challenge
    const daysLeft = Math.max(0, challengeDays - totalDays)

    return { presentDays, daysLeft }
  }

  const getAttendanceStatus = (date: Date) => {
    const dateString = getDateString(date)
    return attendanceData[dateString] || "not-marked"
  }

  const getStatusColor = (date: Date) => {
    if (isPastDate(date) && getAttendanceStatus(date) === "not-marked") {
      return "bg-white border-2 border-gray-300"
    }

    const status = getAttendanceStatus(date)
    switch (status) {
      case "present":
        return "bg-cyan-400"
      case "absent":
        return "bg-red-400" // Made absent color more visible
      case "not-marked":
        return "bg-green-200"
      default:
        return "bg-white border border-gray-200"
    }
  }

  const days = getSevenDays() // Using getSevenDays instead of getDaysInMonth
  const { presentDays, daysLeft } = getAttendanceStats()
  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="p-0">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Track Your Attendance</h3>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Days left in Challenge :</span>
          <span className="text-gray-800 font-semibold">{daysLeft} Days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Active Days :</span>
          <span className="text-gray-800 font-semibold">
            {presentDays} Day{presentDays !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{monthName}</h4>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 mb-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date) => {
            const dateString = getDateString(date)
            const status = getAttendanceStatus(date)
            const canMark = isToday(date) || isPastDate(date)

            return (
              <div key={dateString} className="text-center">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-gray-800 cursor-pointer transition-colors ${getStatusColor(date)} ${canMark ? "hover:opacity-80" : ""}`}
                  onClick={() => {
                    if (canMark) {
                      toggleAttendance(dateString)
                    }
                  }}
                >
                  {date.getDate().toString().padStart(2, "0")}
                </div>

                {status === "present" && <div className="text-xs text-green-600 font-semibold mt-1">✓</div>}
                {status === "absent" && <div className="text-xs text-red-600 font-semibold mt-1">✗</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
          <span className="text-sm text-gray-600">PRESENT</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-400 rounded-full"></div>
          <span className="text-sm text-gray-600">ABSENT</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-600">NOT ACTIVE</span>
        </div>
      </div>
    </div>
  )
}
