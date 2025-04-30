"use client"

import { useState } from "react"
import { StockComponent } from "./stock"
import { CapacityComponent } from "./capacity"
import { LineChartComponent } from "./line-chart"
import { DateRangePicker } from "./date-range"
import { Button } from "@/components/ui/button"

// Dummy data sets for different date ranges
const dataSets = {
    default: {
        stockData: [
            { title: "Outstanding Invoices", value: "475", change: 1.4, comparedTo: "vs last day" },
            { title: "Average Collection Period", value: "04:14", change: 1.4, comparedTo: "vs last month" },
            { title: "Gross Profit Margin", value: "657.8k", change: 1.4, comparedTo: "vs last month" },
            { title: "Inventory Turnover", value: "04:14", change: 1.4, comparedTo: "vs last month" },
            { title: "Online Payments", value: "40%", change: 1.4, comparedTo: "vs last month" },
        ],
        chartData: [
            { title: "Revenue", value: "$163.4k", change: 2.4, isPositive: false, data: [30, 40, 45, 50, 49, 60, 70] },
            { title: "Expenses", value: "$163.4k", change: 1.24, isPositive: true, data: [20, 30, 40, 50, 40, 60, 50] },
            { title: "Stock value", value: "$163.4k", change: 2.34, isPositive: true, data: [25, 35, 45, 55, 45, 65, 55] },
        ],
        capacityData: [
            { name: "Profit", percentage: 76, value: "$163.4k", color: "#1c64f2" },
            { name: "Expenses", percentage: 20, value: "$163.4k", color: "#16bdca" },
            { name: "Assets", percentage: 4, value: "$16.4k", color: "#f05252" },
        ],
    },
    alternate: {
        stockData: [
            { title: "Outstanding Invoices", value: "512", change: 2.1, comparedTo: "vs last day" },
            { title: "Average Collection Period", value: "03:45", change: 2.3, comparedTo: "vs last month" },
            { title: "Gross Profit Margin", value: "702.3k", change: 1.9, comparedTo: "vs last month" },
            { title: "Inventory Turnover", value: "03:52", change: 1.7, comparedTo: "vs last month" },
            { title: "Online Payments", value: "45%", change: 2.5, comparedTo: "vs last month" },
        ],
        chartData: [
            { title: "Revenue", value: "$178.2k", change: 3.2, isPositive: true, data: [40, 50, 55, 60, 59, 70, 80] },
            { title: "Expenses", value: "$152.1k", change: 0.8, isPositive: false, data: [30, 40, 50, 60, 50, 70, 60] },
            { title: "Stock value", value: "$185.7k", change: 3.5, isPositive: true, data: [35, 45, 55, 65, 55, 75, 65] },
        ],
        capacityData: [
            { name: "Profit", percentage: 80, value: "$185.7k", color: "#1c64f2" },
            { name: "Expenses", percentage: 15, value: "$152.1k", color: "#16bdca" },
            { name: "Assets", percentage: 5, value: "$23.2k", color: "#f05252" },
        ],
    },
}

export function FinancialAnalytics() {
    const [currentData, setCurrentData] = useState(dataSets.default)

    const handleDateRangeChange = (startDate: Date, endDate: Date) => {
        // For demo purposes, just toggle between two data sets
        if (currentData === dataSets.default) {
            setCurrentData(dataSets.alternate)
        } else {
            setCurrentData(dataSets.default)
        }
    }

    return (
        <div className="w-full shadow-md bg-white p-6 rounded-md">
            <div className="space-y-6">
                {/* Top metrics */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-16 items-start border-b pb-6">
                    {currentData.stockData.map((item, index) => (
                        <StockComponent
                            key={index}
                            title={item.title}
                            value={item.value}
                            change={item.change}
                            comparedTo={item.comparedTo}
                        />
                    ))}


                    {/* Date selector */}
                    <DateRangePicker onDateRangeChange={handleDateRangeChange} />
                </div>

                {/* Charts section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-6">
                    {currentData.chartData.map((item, index) => (
                        <LineChartComponent
                            key={index}
                            title={item.title}
                            value={item.value}
                            change={item.change}
                            isPositive={item.isPositive}
                            data={item.data}
                        />
                    ))}

                    <CapacityComponent items={currentData.capacityData} />
                </div>

                {/* View reports button */}
                <div>
                    <Button variant="outline" className="text-[#111928] border-[#e5e7eb]">
                        View Financials reports
                    </Button>
                </div>
            </div>
        </div>
    )
}
