"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    className?: string
    checkboxClassName?: string
    labelClassName?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CustomCheckboxProps>(
    ({ label, className, checkboxClassName, labelClassName, ...props }, ref) => {
        const [checked, setChecked] = React.useState(props.checked || false)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(e.target.checked)
            props.onChange?.(e)
        }

        return (
            <div className={cn("flex items-center", className)}>
                <div className="relative flex items-center">
                    <input type="checkbox" ref={ref} className="sr-only" checked={checked} onChange={handleChange} {...props} />
                    <div
                        className={cn(
                            "h-4 w-4 rounded-sm border border-gray-300 flex items-center justify-center",
                            checked ? "bg-[#1a56db] border-[#1a56db]" : "bg-white",
                            checkboxClassName,
                        )}
                    >
                        {checked && <Check className="h-3 w-3 text-white stroke-[3]" />}
                    </div>
                </div>
                {label && (
                    <label htmlFor={props.id} className={cn("ml-2 text-sm font-medium leading-none", labelClassName)}>
                        {label}
                    </label>
                )}
            </div>
        )
    },
)

CustomCheckbox.displayName = "CustomCheckbox"
