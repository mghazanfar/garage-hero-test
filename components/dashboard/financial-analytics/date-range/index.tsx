"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"

interface DateRangePickerProps {
    onDateRangeChange?: (startDate: Date, endDate: Date) => void
    startDate?: Date
    endDate?: Date
    readOnly?: boolean
}

export function DateRangePicker({ onDateRangeChange, startDate, endDate, readOnly = false }: DateRangePickerProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startDate || new Date(2023, 11, 31),
        to: endDate || new Date(2024, 0, 31),
    })

    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (range: DateRange | undefined) => {
        if (readOnly) return;

        setDate(range)
        if (range?.from && range?.to && onDateRangeChange) {
            onDateRangeChange(range.from, range.to)
            setIsOpen(false)
        }
    }

    return (
        <div className="flex justify-end">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 border-[#e5e7eb] text-[#111928] text-xs px-2"
                        onClick={() => !readOnly && setIsOpen(true)}
                    >
                        <Calendar className="h-4 w-4" />
                        <span>
                            {date?.from ? format(date.from, "MMM dd") : "Start"} - {date?.to ? format(date.to, "MMM dd") : "End"}
                        </span>
                        {!readOnly && <ChevronDown className="h-4 w-4" />}
                    </Button>
                </PopoverTrigger>
                {!readOnly && (
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
                )}
            </Popover>
        </div>
    )
}
