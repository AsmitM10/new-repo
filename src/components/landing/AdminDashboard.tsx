"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UserData {
  userId: string
  username: string
  whatsapp: string
  regDate: string
  lastDate: string
  attendance: ("present" | "absent" | "upcoming")[]
  joinedDaysAgo: number
}

interface ChartData {
  name: string
  users: number
}

const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const ChartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
  </svg>
)

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const DashboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
  </svg>
)

const KeyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V22h2v-2.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3zm13-9c0-1.66-1.34-3-3-3S14 3.34 14 5c0 1.30.84 2.40 2 2.82V9h2V7.82C19.16 7.40 20 6.30 20 5z" />
    <path d="M9 12c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1z" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
)

const CameraIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 15.2c1.25 0 2.27-.99 2.27-2.2s-1.02-2.2-2.27-2.2S9.73 11.79 9.73 13s1.02 2.2 2.27 2.2zM16.83 6L15.17 4H8.83L7.17 6H4v12h16V6h-3.17zM12 17c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </svg>
)

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
)

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedMonth, setSelectedMonth] = useState("August")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [usersData, setUsersData] = useState<UserData[]>([])
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [showHolidayModal, setShowHolidayModal] = useState(false)
  const [holidayFromDate, setHolidayFromDate] = useState("")
  const [holidayToDate, setHolidayToDate] = useState("")
  const [holidayReason, setHolidayReason] = useState("")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showChangeProfilePictureModal, setShowChangeProfilePictureModal] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [holidays, setHolidays] = useState([
    { date: new Date(2025, 7, 9), name: "Rakshbandhan" },
    { date: new Date(2025, 7, 15), name: "Independence Day" },
    { date: new Date(2025, 7, 26), name: "Janmashtami" },
  ])

  const generateRealisticUsers = (): UserData[] => {
    const names = [
      "Aamit Mirkar",
      "Tejas Malve",
      "Dikshant Kasabe",
      "Priya Sharma",
      "Rohit Patil",
      "Sneha Desai",
      "Arjun Kulkarni",
      "Kavya Joshi",
      "Vikram Singh",
      "Anita Rao",
      "Siddharth Mehta",
      "Pooja Gupta",
      "Rahul Nair",
      "Deepika Iyer",
      "Karan Agarwal",
      "Meera Reddy",
      "Ajay Kumar",
      "Ritu Bansal",
      "Nikhil Jain",
      "Swati Pandey",
    ]

    const phoneNumbers = [
      "+91 9967954630",
      "+91 8765432109",
      "+91 9876543210",
      "+91 7654321098",
      "+91 8901234567",
      "+91 9012345678",
      "+91 7890123456",
      "+91 8123456789",
      "+91 9234567890",
      "+91 7345678901",
      "+91 8456789012",
      "+91 9567890123",
      "+91 7678901234",
      "+91 8789012345",
      "+91 9890123456",
      "+91 7901234567",
      "+91 8012345678",
      "+91 9123456789",
      "+91 7234567890",
      "+91 8345678901",
    ]

    return names.map((name, index) => {
      const regDate = new Date(2025, 8, Math.floor(Math.random() * 7) + 1) // Sept 1-7, 2025
      const lastActiveDate = new Date(2025, 8, Math.floor(Math.random() * 7) + 1) // Recent activity

      // Generate realistic attendance pattern (7 days)
      const attendance: ("present" | "absent" | "upcoming")[] = Array.from({ length: 7 }, (_, dayIndex) => {
        const dayDate = new Date(2025, 8, dayIndex + 1)
        const today = new Date(2025, 8, 8) // Assuming today is Sept 8, 2025

        if (dayDate > today) return "upcoming"

        // Realistic attendance patterns - some users more consistent than others
        const userConsistency = Math.random()
        if (userConsistency > 0.8) return "present" // Very consistent users
        if (userConsistency > 0.6) return Math.random() > 0.2 ? "present" : "absent" // Mostly present
        if (userConsistency > 0.3) return Math.random() > 0.5 ? "present" : "absent" // Mixed attendance
        return Math.random() > 0.7 ? "present" : "absent" // Irregular users
      })

      return {
        userId: `USR${String(index + 1).padStart(4, "0")}`,
        username: name,
        whatsapp: phoneNumbers[index],
        regDate: regDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        lastDate: lastActiveDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        attendance: attendance,
        joinedDaysAgo: Math.floor((new Date().getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24)),
      }
    })
  }

  useEffect(() => {
    setUsersData(generateRealisticUsers())

    const interval = setInterval(() => {
      setCurrentTime(new Date())
      // Occasionally update user data to simulate real-time changes
      if (Math.random() > 0.95) {
        setUsersData(generateRealisticUsers())
      }
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const calculateStats = () => {
    const totalUsers = usersData.length
    const activeUsers = usersData.filter(
      (user) => user.joinedDaysAgo <= 7 && user.attendance.filter((day) => day === "present").length >= 3,
    ).length

    const totalAttendanceDays = usersData.reduce(
      (acc, user) => acc + user.attendance.filter((day) => day === "present").length,
      0,
    )
    const totalPossibleDays = usersData.reduce(
      (acc, user) => acc + user.attendance.filter((day) => day !== "upcoming").length,
      0,
    )
    const attendanceRate = totalPossibleDays > 0 ? Math.round((totalAttendanceDays / totalPossibleDays) * 100) : 0

    const sessionsToday = Math.floor(Math.random() * 50) + 20 // Random sessions for today

    return {
      totalUsers: totalUsers.toLocaleString(),
      activeUsers: activeUsers.toLocaleString(),
      attendanceRate: `${attendanceRate}%`,
      sessionsToday: sessionsToday.toString(),
    }
  }

  const stats = calculateStats()

  const statsData = [
    {
      title: "Total User",
      value: stats.totalUsers,
      trend: "8.5% Up from yesterday",
      isUp: true,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: UsersIcon,
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      trend: "1.3% Up from past week",
      isUp: true,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      icon: UserIcon,
    },
    {
      title: "Attendance Rate",
      value: stats.attendanceRate,
      trend: "4.3% Down from yesterday",
      isUp: false,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      icon: ChartIcon,
    },
    {
      title: "Sessions Conducted",
      value: stats.sessionsToday,
      trend: `Updated ${currentTime.toLocaleTimeString()}`,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      icon: ClockIcon,
    },
  ]

  const generateChartData = (): ChartData[] => {
    const daysInMonth = new Date(
      Number.parseInt(selectedYear),
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(selectedMonth) + 1,
      0,
    ).getDate()

    return Array.from({ length: 5 }, (_, i) => {
      const day = Math.floor((daysInMonth / 5) * (i + 1))
      const baseUsers = 3000 + i * 500
      const variation = Math.floor(Math.random() * 1000) - 500
      return {
        name: String(day).padStart(2, "0"),
        users: Math.max(baseUsers + variation, 1000),
      }
    })
  }

  const chartData = generateChartData()

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to be last (6), Monday becomes 0
  }

  const formatCalendarMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCalendarDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const addHoliday = () => {
    if (holidayFromDate && holidayReason) {
      const fromDay = Number.parseInt(holidayFromDate)
      const toDay = holidayToDate ? Number.parseInt(holidayToDate) : fromDay

      const newHolidays: { date: Date; name: string }[] = []
      for (let day = fromDay; day <= toDay; day++) {
        const holidayDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day)
        newHolidays.push({ date: holidayDate, name: holidayReason })
      }

      setHolidays((prev) => [...prev, ...newHolidays])
      setHolidayFromDate("")
      setHolidayToDate("")
      setHolidayReason("")
      setShowHolidayModal(false)
    }
  }

  const removeHoliday = (dateToRemove: Date) => {
    setHolidays((prev) => prev.filter((holiday) => holiday.date.toDateString() !== dateToRemove.toDateString()))
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      calendarDate.getMonth() === today.getMonth() &&
      calendarDate.getFullYear() === today.getFullYear()
    )
  }

  const isHoliday = (day: number) => {
    return holidays.some(
      (holiday) =>
        holiday.date.getDate() === day &&
        holiday.date.getMonth() === calendarDate.getMonth() &&
        holiday.date.getFullYear() === calendarDate.getFullYear(),
    )
  }

  const getHoliday = (day: number) => {
    return holidays.find(
      (holiday) =>
        holiday.date.getDate() === day &&
        holiday.date.getMonth() === calendarDate.getMonth() &&
        holiday.date.getFullYear() === calendarDate.getFullYear(),
    )
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(calendarDate)
    const firstDay = getFirstDayOfMonth(calendarDate)
    const days = []

    // Previous month's trailing days
    const prevMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 0)
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonth.getDate() - firstDay + i + 1
      days.push(
        <div key={`prev-${i}`} className="p-4 text-gray-400 text-center min-h-[80px] border-r border-b border-gray-200">
          {day}
        </div>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const holiday = getHoliday(day)
      const todayClass = isToday(day) ? "bg-blue-50 border-blue-200" : ""

      days.push(
        <div
          key={day}
          className={`p-4 text-center border-r border-b border-gray-200 min-h-[80px] relative hover:bg-gray-50 cursor-pointer ${todayClass}`}
        >
          <div className={`font-medium ${isToday(day) ? "text-blue-600" : "text-gray-900"}`}>{day}</div>
          {holiday && (
            <div className="mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded truncate">{holiday.name}</div>
          )}
        </div>,
      )
    }

    // Next month's leading days to fill the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (firstDay + daysInMonth)
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="p-4 text-gray-400 text-center min-h-[80px] border-r border-b border-gray-200"
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const renderMiniCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarDate)
    const firstDay = getFirstDayOfMonth(calendarDate)
    const days = []

    // Previous month's trailing days
    const prevMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 0)
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonth.getDate() - firstDay + i + 1
      days.push(
        <div key={`prev-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
          {day}
        </div>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const holidayExists = isHoliday(day)
      const todayExists = isToday(day)

      days.push(
        <div
          key={day}
          onClick={() => {
            setHolidayFromDate(day.toString())
            setHolidayToDate("")
          }}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-full cursor-pointer hover:bg-gray-100 transition-colors ${holidayExists
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : todayExists
                ? "bg-blue-100 text-blue-800 font-medium"
                : "text-gray-900"
            }`}
        >
          {day}
        </div>,
      )
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (firstDay + daysInMonth)
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
          {day}
        </div>,
      )
    }

    return days
  }

  const handleLogout = () => {
    setShowLogoutModal(false)
    // Add logout logic here (redirect to login, clear session, etc.)
    window.location.href = "/admin/login"
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }
    // Here you would typically make an API call to change the password
    alert("Password changed successfully!")
    setShowChangePasswordModal(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleChangeProfilePicture = () => {
    // Here you would typically handle file upload
    alert("Profile picture change functionality would be implemented here!")
    setShowChangeProfilePictureModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-48 bg-white shadow-lg h-screen flex flex-col">
        <div className="p-4  border-gray-200">
          <img src="/logo.svg" alt="Bright Star Fitness" className="h-15 w-auto" />
        </div>

        {/* Sidebar content */}
        <div className="p-4 h-100px h-screen bg-white shadow-lg z-20 space-y-2 flex-1 flex flex-col">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeSection === "dashboard" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <DashboardIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveSection("calendar")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeSection === "calendar" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Calendar</span>
          </button>

        
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full h-1000px flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-gray-600 hover:bg-gray-100"
          >
            <LogoutIcon className="w-5 h-full" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Kalpesh Kamble</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowChangePasswordModal(true)}
              >
                <KeyIcon className="w-4 h-4 text-pink-500" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowChangeProfilePictureModal(true)}
              >
                <CameraIcon className="w-4 h-4 text-blue-500" />
                <span>Change Profile Picture</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 p-8">
          {showChangePasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setShowChangePasswordModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {showChangeProfilePictureModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Profile Picture</h3>
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                      <UserIcon className="w-10 h-10 text-gray-600" />
                    </div>
                    <input
                      type="file" 
                      accept="image/*"
                      aria-label="Choose a new profile picture (JPG, PNG)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <p className="text-sm text-gray-500 mt-2">Choose a new profile picture (JPG, PNG)</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setShowChangeProfilePictureModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangeProfilePicture}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Upload Picture
                  </button>
                </div>
              </div>
            </div>
          )}

          {showLogoutModal && (
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-teal-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold text-white mb-4">Confirm Logout</h3>
                <p className="text-white mb-6">Are you sure you want to logout?</p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-white hover:bg-teal-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                      </div>
                    </div>
                    <h3 className="text-sm text-gray-600 font-medium mb-2">{stat.title}</h3>
                    <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
                    {stat.trend && (
                      <div
                        className={`flex items-center text-xs font-medium ${stat.isUp ? "text-teal-600" : "text-red-500"}`}
                      >
                        <span className="mr-1">{stat.isUp ? "↗" : "↘"}</span>
                        {stat.trend}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">New Registrations</h3>
                  <div className="flex gap-4">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="px-3 py-1 border text-black border-gray-300 rounded-md text-sm"
                    >
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="px-3 py-1 border text-black border-gray-300 rounded-md text-sm"
                    >
                      <option>2025</option>
                      <option>2024</option>
                    </select>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Users Details</h3>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                      <span className="text-gray-600">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span className="text-gray-600">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-gray-600">Upcoming</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex gap-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-3 py-2 text-black border border-gray-300 rounded-md text-sm"
                  />
                  <select className="px-3 py-2 text-black border border-gray-300 rounded-md text-sm">
                    <option>All Users</option>
                    <option>Active Users</option>
                    <option>Inactive Users</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Username</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Whatsapp Number</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Registration Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Last date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData.slice(0, 10).map((user, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{user.userId}</td>
                          <td className="px-4 py-4 text-sm text-gray-900 font-medium">{user.username}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{user.whatsapp}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{user.regDate}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{user.lastDate}</td>
                          <td className="px-4 py-4">
                            <div className="flex gap-1">
                              {user.attendance.map((status, idx) => (
                                <div
                                  key={idx}
                                  className={`w-3 h-3 rounded-full ${status === "present"
                                      ? "bg-teal-400"
                                      : status === "absent"
                                        ? "bg-red-400"
                                        : "bg-gray-300"
                                    }`}
                                  title={`Day ${idx + 1}: ${status}`}
                                />
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Showing 1-10 of {usersData.length} users</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Calendar view */}
          {activeSection === "calendar" && (
            <div className="flex gap-8">
              {/* Main Calendar */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
                  <button
                    onClick={() => setShowHolidayModal(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    + Add Holidays
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-600">
                      Today{" "}
                      <span className="font-medium">
                        {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => navigateMonth("prev")}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        ←
                      </button>
                      <h2 className="text-lg font-semibold text-gray-800">{formatCalendarMonth(calendarDate)}</h2>
                      <button
                        onClick={() => navigateMonth("next")}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 border border-gray-200 rounded-lg overflow-hidden">
                    {/* Header */}
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                      <div
                        key={day}
                        className="p-4 bg-gray-50 border-r border-b border-gray-200 text-center font-medium text-gray-600 last:border-r-0"
                      >
                        {day}
                      </div>
                    ))}

                    {/* Calendar Grid */}
                    {renderCalendarGrid()}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-80">
                {showHolidayModal && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-800">Add Holiday</h3>
                      <button onClick={() => setShowHolidayModal(false)} className="text-gray-400 hover:text-gray-600">
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">From</label>
                          <input
                            type="number"
                            min="1"
                            max={getDaysInMonth(calendarDate)}
                            value={holidayFromDate}
                            onChange={(e) => setHolidayFromDate(e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">To</label>
                          <input
                            type="number"
                            min={holidayFromDate || "1"}
                            max={getDaysInMonth(calendarDate)}
                            value={holidayToDate}
                            onChange={(e) => setHolidayToDate(e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Reason</label>
                        <input
                          type="text"
                          value={holidayReason}
                          onChange={(e) => setHolidayReason(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Enter holiday reason"
                        />
                      </div>

                      <button
                        onClick={addHoliday}
                        disabled={!holidayFromDate || !holidayReason}
                        className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Add Holidays
                      </button>
                    </div>
                  </div>
                )}

                {/* Mini Calendar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                      <div key={day} className="text-xs text-gray-500 text-center font-medium p-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">{renderMiniCalendar()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
