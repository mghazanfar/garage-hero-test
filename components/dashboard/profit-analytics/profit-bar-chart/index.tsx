"use client"

import { ChevronDown, ChevronRight } from "lucide-react"

export default function ProfitChart() {
    return (
        <div className="flex gap-2">
            {/* Month labels outside the card */}
            <div className="flex flex-col gap-14 justify-start pt-3">
                <div className="transform -rotate-90 text-xs text-[#767c85] h-10 flex items-center">Aug 24</div>
                <div className="transform -rotate-90 text-xs text-[#767c85] h-10 flex items-center">Jul 24</div>
                <div className="transform -rotate-90 text-xs text-[#767c85] h-10 flex items-center">Jun 24</div>
                <div className="transform -rotate-90 text-xs text-[#767c85] h-10 flex items-center">May 24</div>
                <div className="transform -rotate-90 text-xs text-[#767c85] h-10 flex items-center">Apr 24</div>
            </div>

            <div className="p-6 flex-1 bg-white shadow-md rounded-md">
                <div className="space-y-6">
                    {/* Profit Section */}
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[#767c85] text-sm font-medium">Profit</p>
                            <h2 className="text-4xl font-bold text-[#222222] mt-1">$5,405</h2>
                        </div>
                        <div className="bg-[#def7ec] text-[#03543f] px-3 py-1 rounded-md flex items-center text-sm">
                            <span className="mr-1">↑</span> Profit rate 23.5%
                        </div>
                    </div>

                    {/* Sales and Expenses - Legend outside the chart */}
                    <div className="flex items-start pt-4 border-t border-[#e5e7eb]">
                        <div className="flex-1">
                            <p className="text-[#767c85] text-sm font-medium">Sales</p>
                            <h3 className="text-2xl font-bold text-[#1a56db] mt-1">$23,635</h3>
                        </div>
                        <div className="flex-1 text-center">
                            <p className="text-[#767c85] text-sm font-medium">Expenses</p>
                            <h3 className="text-2xl font-bold text-[#16bdca] mt-1">$18,230</h3>
                        </div>
                        <div className="flex-1"></div> {/* Empty div for spacing */}
                    </div>

                    {/* Horizontal Bar Chart */}
                    <div className="mt-6 relative">
                        {/* Axis lines */}
                        <div className="absolute inset-0  border-[#e5e7eb]"></div>

                        <div className="relative pt-8 pb-8">
                            <div className="flex flex-col space-y-8">
                                {/* Month rows with bars */}
                                <BarRow salesWidth="w-[95%]" expensesWidth="w-[92%]" />
                                <BarRow salesWidth="w-[75%]" expensesWidth="w-[65%]" />
                                <BarRow salesWidth="w-[60%]" expensesWidth="w-[45%]" />
                                <BarRow salesWidth="w-[70%]" expensesWidth="w-[80%]" />
                                <BarRow salesWidth="w-[58%]" expensesWidth="w-[35%]" />
                            </div>
                        </div>

                        {/* X-axis labels */}
                        <div className="flex justify-between text-xs text-[#767c85] mt-2 relative">
                            {["$0", "$500", "$1000", "$1500", "$2000", "$2500"].map((value, index) => (
                                <div
                                    key={index}
                                    className="transform -rotate-45 origin-top-left"
                                    style={{ left: `${index * 20}%` }}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-16 border-t border-[#e5e7eb]">
                        <div className="flex items-center text-sm text-[#767c85]">
                            <span>Last 6 months</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                        </div>
                        <div className="flex items-center text-[#1a56db] text-sm font-medium">
                            <span>REVENUE REPORT</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Component for bar rows
function BarRow({ salesWidth, expensesWidth }: { salesWidth: string, expensesWidth: string }) {
    return (
        <div className="flex-1 space-y-2">
            <div className={`h-5 rounded-r-lg bg-[#1a56db] ${salesWidth}`}></div>
            <div className={`h-5 rounded-r-lg bg-[#16bdca] ${expensesWidth}`}></div>
        </div>
    )
}
