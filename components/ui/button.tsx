import React, { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export const buttonVariants = {
    primary: "bg-[#1c64f2] hover:bg-[#1a56db] text-white border border-transparent",
    outline: "bg-transparent hover:bg-gray-50 text-[#111928] border border-[#e5e7eb]",
    ghost: "bg-transparent hover:bg-gray-50 text-[#111928] border border-transparent",
    link: "bg-transparent text-[#1c64f2] hover:underline border-none p-0 h-auto",
    danger: "bg-[#f05252] hover:bg-[#e02424] text-white border border-transparent",
} as const

export const buttonSizes = {
    sm: "text-xs px-2.5 py-1.5 rounded",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md",
} as const

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            children,
            variant = "primary",
            size = "md",
            fullWidth = false,
            leftIcon,
            rightIcon,
            isLoading = false,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#1c64f2] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    buttonVariants[variant],
                    buttonSizes[size],
                    fullWidth ? "w-full" : "",
                    className
                )}
                disabled={isLoading || disabled}
                ref={ref}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        )
    }
)

Button.displayName = "Button"

export { Button }
