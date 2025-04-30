"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"

interface DateRangePickerProps {
    onDateRangeChange: (startDate: Date, endDate: Date) => void
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2023, 11, 31), // Dec 31
        to: new Date(2024, 0, 31), // Jan 31
    })

    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (range: DateRange | undefined) => {
        setDate(range)
        if (range?.from && range?.to) {
            onDateRangeChange(range.from, range.to)
            setIsOpen(false)
        }
    }

    return (
        <div className="flex justify-end">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-[#e5e7eb] text-[#111928]">
                        <Calendar className="h-4 w-4" />
                        <span>
                            {date?.from ? format(date.from, "MMM dd") : "Start"} - {date?.to ? format(date.to, "MMM dd") : "End"}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
