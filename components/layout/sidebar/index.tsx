"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, HelpCircle, Home, FileText } from "lucide-react"

interface SidebarProps {
  close?: boolean
}

export default function Sidebar({ close = false }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isClosed, setIsClosed] = useState(close)

  // Update internal state when prop changes
  useEffect(() => {
    setIsClosed(close)
  }, [close])

  return (
    <div
      className={`bg-white border-r border-[#e5e7eb] transition-all duration-300 ease-in-out ${
        isClosed ? "w-[90px]" : "w-64"
      }`}
    >
      <div className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-[#111928] bg-[#f3f4f6] rounded-md"
            >
              <div className="flex items-center">
                <Home className="w-4 h-4 min-w-4" />
                {!isClosed && <span className="ml-2 transition-opacity duration-300">Dashboard</span>}
              </div>
              {!isClosed && (
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
              )}
            </button>

            {isOpen && !isClosed && <div className="pl-4 space-y-1">{/* Dashboard submenu items would go here */}</div>}
          </div>

          <nav className="space-y-1">
            <div className="relative group">
              <Link
                href="#"
                className={`flex items-center ${
                  isClosed ? "justify-center" : ""
                } px-2 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#f3f4f6] rounded-md`}
              >
                <FileText className="w-4 h-4 min-w-4" />
                {!isClosed && <span className="ml-2">FAQs</span>}
              </Link>
              {isClosed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                  FAQs
                </div>
              )}
            </div>

            <div className="relative group">
              <Link
                href="#"
                className={`flex items-center ${
                  isClosed ? "justify-center" : ""
                } px-2 py-2 text-sm font-medium text-[#6b7280] hover:bg-[#f3f4f6] rounded-md`}
              >
                <HelpCircle className="w-4 h-4 min-w-4" />
                {!isClosed && <span className="ml-2">Help</span>}
              </Link>
              {isClosed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                  Help
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
