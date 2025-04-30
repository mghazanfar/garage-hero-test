"use client";

import { Search } from "lucide-react";
import { Button, TextInput } from "flowbite-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    submit?: boolean;
    onSubmit?: () => void;
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Search",
    submit = false,
    onSubmit,
}: SearchInputProps) {
    return (
        <div className="relative w-full  max-w-[402px]">
            <div className="flex items-center border border-[#e5e7eb] rounded-lg overflow-hidden">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-[#6b7280]" />
                </div>
                <input
                    type="search"
                    placeholder={placeholder}
                    className="pl-10 bg-[#f8fafc] border-0 text-[#6b7280] w-full focus:ring-0 [&>input]:border-0 [&>input]:focus:ring-0 [&>input]:!border-0"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {submit && (
                    <Button
                        onClick={onSubmit}
                        className="ml-0 bg-ghred-500 hover:bg-ghred-600 rounded-none"
                    >
                        Search
                    </Button>
                )}
            </div>
        </div>
    );
} 