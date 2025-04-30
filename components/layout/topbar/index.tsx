"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input.component";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Topbar({ setCloseSidebar }: { setCloseSidebar: () => void }) {
    const [searchQuery, setSearchQuery] = useState("");
    const { logout } = useAuth();
    const router = useRouter();

    return (
        <header className="border-b border-[#e5e7eb] bg-white">
            <div className="flex items-center gap-5 px-4 py-2">
                {/* Logo and Menu */}
                <div
                    className="flex cursor-pointer items-center gap-5"
                    onClick={() => setCloseSidebar()}
                >
                    <div className="flex items-center">
                        <img
                            src="./gh_small_logo.svg"
                            alt="Garage Hero Logo"
                            className="h-8"
                        />
                    </div>
                    <button className="p-2 text-[#6b7280] hover:text-[#111928]">
                        <Menu size={30} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative hidden flex-1 md:block">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search"
                    />
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center">
                        <button className="rounded-full p-0 text-[#6b7280] hover:text-[#111928]">
                            <Image src="/moon.svg" alt="Theme" width={20} height={20} />
                        </button>
                        <button className="flex items-center text-[#6b7280]">
                            <Image src="/user.svg" alt="User" width={16} height={16} />
                        </button>
                        <button className="rounded-full p-0 text-[#6b7280] hover:text-[#111928]">
                            <Image src="/map-pin.svg" alt="Location" width={20} height={20} />
                        </button>
                        <button className="rounded-full p-0 text-[#6b7280] hover:text-[#111928]">
                            <Image src="/lang.svg" alt="Language" width={20} height={20} />
                        </button>
                    </div>
                    <Image
                        src="/avatar.png"
                        alt="Garage Hero Logo"
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </header>
    );
}
