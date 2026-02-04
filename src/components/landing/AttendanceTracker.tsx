"use client"

interface AttendanceTrackerProps {
  attendance?: string[]
}

export default function AttendanceTracker({ attendance = [] }: AttendanceTrackerProps) {
  const totalDays = 7

  /* -------------------------
     Helpers
  --------------------------*/
  const getStatus = (index: number) => {
    const value = attendance[index]
    if (value === "P") return "present"
    if (value === "A") return "absent"
    return "not-marked"
  }

  const getStatusColor = (status: string, isPast: boolean) => {
    if (isPast && status === "not-marked") {
      return "bg-white border-2 border-gray-300"
    }

    switch (status) {
      case "present":
        return "bg-cyan-400"
      case "absent":
        return "bg-red-400"
      default:
        return "bg-green-200"
    }
  }

  /* -------------------------
     Stats
  --------------------------*/
  const presentDays = attendance.filter((d) => d === "P").length
  const daysLeft = Math.max(0, totalDays - attendance.length)

  /* -------------------------
     Render
  --------------------------*/
  return (
    <div className="p-0">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Track Your Attendance
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">
            Days left in Challenge :
          </span>
          <span className="text-gray-800 font-semibold">
            {daysLeft} Days
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">
            Total Active Days :
          </span>
          <span className="text-gray-800 font-semibold">
            {presentDays} Day{presentDays !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          7 Day Challenge
        </h4>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map(
            (day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-600 mb-2"
              >
                {day}
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: totalDays }).map((_, index) => {
            const status = getStatus(index)
            const isPast = index < attendance.length

            return (
              <div key={index} className="text-center">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-gray-800 ${getStatusColor(
                    status,
                    isPast
                  )}`}
                >
                  {index + 1}
                </div>

                {status === "present" && (
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    ✓
                  </div>
                )}
                {status === "absent" && (
                  <div className="text-xs text-red-600 font-semibold mt-1">
                    ✗
                  </div>
                )}
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
