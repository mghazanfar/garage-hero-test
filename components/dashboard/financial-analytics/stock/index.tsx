interface StockComponentProps {
    title: string
    value: string
    change: number
    comparedTo: string
}

export function StockComponent({ title, value, change, comparedTo }: StockComponentProps) {
    return (
        <div className="border-b pb-4 md:border-b-0  md:pr-4 md:pb-0">
            <h3 className="text-[#6b7280] font-normal text-sm">{title}</h3>
            <div className="flex items-baseline gap-2 mt-2">
                <p className="text-3xl font-bold text-[#111928]">{value}</p>
                <div className="flex items-center text-[#0e9f6e] text-sm font-medium">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1"
                    >
                        <path d="M8 4L12 8L10.6 9.4L8.5 7.3V12H7.5V7.3L5.4 9.4L4 8L8 4Z" fill="currentColor" />
                    </svg>
                    {change}%
                </div>
            </div>
            <p className="text-[#6b7280] font-normal text-sm">{comparedTo}</p>
        </div>
    )
}
