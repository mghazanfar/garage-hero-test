"use client"

import { useState } from "react"
import { Search, Menu, Bell, Moon, Settings, Percent } from "lucide-react"
import { Avatar, TextInput } from "flowbite-react"

export function Topbar({ setCloseSidebar }: { setCloseSidebar: () => void }) {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <header className="border-b border-[#e5e7eb] bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                {/* Logo and Menu */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center cursor-pointer" onClick={() => setCloseSidebar()}>
                        Logo
                    </div>
                    <button className="p-2 text-[#6b7280] hover:text-[#111928]">
                        <Menu size={20} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mx-4 hidden flex-1 md:block max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-[#6b7280]" />
                    </div>
                    <TextInput
                        type="search"
                        placeholder="Search"
                        className="pl-10 bg-[#f9fafb] border-[#e5e7eb] text-[#6b7280] w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-3">
                    <button className="p-1 text-[#6b7280] hover:text-[#111928] rounded-full">
                        <Moon size={18} />
                    </button>
                    <button className="p-1 text-[#6b7280] hover:text-[#111928] rounded-full">
                        <Bell size={18} />
                    </button>
                    <button className="p-1 text-[#6b7280] hover:text-[#111928] rounded-full">
                        <Settings size={18} />
                    </button>
                    <div className="flex items-center gap-1 text-[#6b7280]">
                        <Percent size={16} />
                        <span className="text-sm font-medium">90%</span>
                    </div>
                    <Avatar
                        img="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test1-8BwE3rUIQDCOpPQuIA0GHo2dECpIf3.png"
                        alt="User"
                        rounded
                        size="sm"
                        className="border border-[#e5e7eb]"
                    />
                </div>
            </div>
        </header >
    )
}