"use client"

import { Edit } from "lucide-react"
import { useState } from "react"

export function MonthlyTarget() {
  const [percentage, setPercentage] = useState(80)
  const [daysLeft, setDaysLeft] = useState(6)
  const [currency, setCurrency] = useState("USD")
  const [showTooltip, setShowTooltip] = useState(false)

  // Calculate the circle's circumference and the offset based on percentage
  const radius = 120
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  const progressStrokeWidth = 40
  const backgroundStrokeWidth = 30 // Thinner background circle

  return (
    <div className="p-6 shadow-md rounded-md bg-white w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[#6b7280] text-2xl font-medium tracking-wide">MONTHLY TARGET</h2>
        {/* Custom edit icon to match Figma */}
        <button className="text-[#6b7280]">
          <Edit className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex justify-center">
        {/* SVG for circular progress */}
        <svg
          width="175"
          height="175"
          viewBox="0 0 300 300"
          className="transform -rotate-90"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Background circle - thinner */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="#e3e7ee"
            strokeWidth={backgroundStrokeWidth}
            className="cursor-pointer"
          />

          {/* Progress circle - thicker, no border radius */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="#1a4c84"
            strokeWidth={progressStrokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          // Removed strokeLinecap="round" to remove border radius
          />
        </svg>

        {/* Percentage and label in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-xl text-[#222222] font-bold">{percentage}%</p>
          <p className="text-[#6b7280] text-base font-normal mt-2">Reached</p>
        </div>

        {/* Tooltip with connecting line - only shown on hover */}
        {showTooltip && (
          <div className="absolute top-[70px] right-[20px] flex items-center">
            {/* Line connecting to circle */}
            <div className="w-[40px] h-[1px] bg-[#767c85]"></div>

            {/* Tooltip box */}
            <div className="bg-[#767c85] text-white p-3 rounded-md max-w-[220px]">
              <p className="text-center">
                {daysLeft} days more to generate {"{" + currency + "}"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-12">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1a4c84]"></div>
          <span className="text-[#222222]">Target reached</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1aa5ae]"></div>
          <span className="text-[#222222]">Days to go</span>
        </div>
      </div>
    </div>
  )
}
