interface CapacityItem {
    name: string
    percentage: number
    value: string
    color: string
}

interface CapacityComponentProps {
    items: CapacityItem[]
}

export function CapacityComponent({ items }: CapacityComponentProps) {
    return (
        <div className="col-span-1">
            <div className="grid grid-cols-3 gap-2">
                {items.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-1">
                            <span className="w-4 h-4 flex items-center justify-center">
                                <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            </span>
                            <span className="text-[#6b7280] text-sm">{item.name}</span>
                        </div>
                        <p className="text-2xl font-bold text-[#111928]">{item.percentage}%</p>
                        <p className="text-sm text-[#6b7280]">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="h-5 w-full bg-gray-100 rounded-full mt-4 overflow-hidden">
                <div className="flex h-full">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="h-full"
                            style={{
                                backgroundColor: item.color,
                                width: `${item.percentage}%`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-2 text-xs">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-[#6b7280]">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
