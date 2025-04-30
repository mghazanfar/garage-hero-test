"use client"

import { useState } from "react"
import { StockComponent } from "./stock"
import { CapacityComponent } from "./capacity"
import { LineChartComponent } from "./line-chart"
import { DateRangePicker } from "./date-range"
import { Button } from "@/components/ui/button"
import { useDashboardData } from "@/hooks/useDashboardData"
import { Loader2 } from "lucide-react"
import { Card } from "flowbite-react"

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
            { name: "Profit", percentage: 76, value: "$163.4k", color: "#1c64f2", icon: "/cart.svg" },
            { name: "Expenses", percentage: 20, value: "$163.4k", color: "#16bdca", icon: "/expense.svg" },
            { name: "Assets", percentage: 4, value: "$16.4k", color: "#f05252", icon: "/tag.svg" },
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
            { name: "Profit", percentage: 80, value: "$185.7k", color: "#1c64f2", icon: "/cart.svg" },
            { name: "Expenses", percentage: 15, value: "$152.1k", color: "#16bdca", icon: "/expense.svg" },
            { name: "Assets", percentage: 5, value: "$23.2k", color: "#f05252", icon: "/tag.svg" },
        ],
    },
}

const formatNumber = (value: number): string => {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}k`
    }
    return `$${value.toLocaleString()}`
}

export function FinancialAnalytics() {
    const { dashboardData, isLoadingDashboardData, dashboardDataError, refetchDashboardData } = useDashboardData();

    const currentData = dashboardData ? {
        stockData: [
            { title: "Outstanding Invoices", value: formatNumber(dashboardData.stats.outstanding_invoices), change: dashboardData.change.outstanding_invoices, comparedTo: "vs last day" },
            { title: "Average Collection Period", value: dashboardData.stats.average_collection_period, change: dashboardData.change.average_collection_period, comparedTo: "vs last month" },
            { title: "Gross Profit Margin", value: formatNumber(dashboardData.stats.gross_profit_margin), change: dashboardData.change.gross_profit_margin, comparedTo: "vs last month" },
            { title: "Inventory Turnover", value: dashboardData.stats.inventory_turnover, change: dashboardData.change.inventory_turnover, comparedTo: "vs last month" },
            { title: "Online Payments", value: `${dashboardData.stats.online_payments}%`, change: dashboardData.change.online_payments, comparedTo: "vs last month" },
        ],
        chartData: [
            { title: "Revenue", value: formatNumber(dashboardData.financials.revenue), change: dashboardData.change.revenue, isPositive: dashboardData.change.revenue > 0, data: [0, 0, 0, 0, 0, 0, 0] },
            { title: "Expenses", value: formatNumber(dashboardData.financials.expenses), change: dashboardData.change.expenses, isPositive: dashboardData.change.expenses > 0, data: [0, 0, 0, 0, 0, 0, 0] },
            { title: "Stock value", value: formatNumber(dashboardData.financials.stock_value), change: dashboardData.change.stock_value, isPositive: dashboardData.change.stock_value > 0, data: [0, 0, 0, 0, 0, 0, 0] },
        ],
        capacityData: [
            { name: "Profit", percentage: dashboardData.financials.profit_distribution.profit, value: formatNumber(dashboardData.financials.revenue), color: "#1c64f2", icon: "/cart.svg" },
            { name: "Expenses", percentage: dashboardData.financials.profit_distribution.expenses, value: formatNumber(dashboardData.financials.expenses), color: "#f05252", icon: "/expense.svg" },
            { name: "Assets", percentage: dashboardData.financials.profit_distribution.assets, value: formatNumber(dashboardData.financials.stock_value), color: "#0e9f6e", icon: "/tag.svg" },
        ],
    } : {
        stockData: [
            { title: "Outstanding Invoices", value: "$0", change: 0, comparedTo: "vs last day" },
            { title: "Average Collection Period", value: "0", change: 0, comparedTo: "vs last month" },
            { title: "Gross Profit Margin", value: "$0", change: 0, comparedTo: "vs last month" },
            { title: "Inventory Turnover", value: "0", change: 0, comparedTo: "vs last month" },
            { title: "Online Payments", value: "0%", change: 0, comparedTo: "vs last month" },
        ],
        chartData: [
            { title: "Revenue", value: "$0", change: 0, isPositive: false, data: [0, 0, 0, 0, 0, 0, 0] },
            { title: "Expenses", value: "$0", change: 0, isPositive: true, data: [0, 0, 0, 0, 0, 0, 0] },
            { title: "Stock value", value: "$0", change: 0, isPositive: true, data: [0, 0, 0, 0, 0, 0, 0] },
        ],
        capacityData: [
            { name: "Profit", percentage: 0, value: "$0", color: "#1c64f2", icon: "/cart.svg" },
            { name: "Expenses", percentage: 0, value: "$0", color: "#f05252", icon: "/expense.svg" },
            { name: "Assets", percentage: 0, value: "$0", color: "#0e9f6e", icon: "/tag.svg" },
        ],
    };

    if (isLoadingDashboardData) {
        return (
            <div className="w-full shadow-md bg-white p-6 rounded-md">
                <div className="flex items-center justify-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-[#1c64f2]" />
                </div>
            </div>
        );
    }

    if (dashboardDataError && !dashboardData) {
        return (
            <div className="w-full shadow-md bg-white p-6 rounded-md">
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <p className="text-[#6b7280]">We faced some error while fetching the data. Please wait for some time and try again.</p>
                    <Button onClick={refetchDashboardData} variant="primary">
                        Retry
                    </Button>
                </div>
            </div>
        );
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
                    <DateRangePicker
                        startDate={dashboardData?.period?.start ? new Date(dashboardData.period.start) : undefined}
                        endDate={dashboardData?.period?.end ? new Date(dashboardData.period.end) : undefined}
                        readOnly={true}
                    />
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
