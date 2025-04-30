"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { useMonthlyTarget } from "@/hooks/useMonthlyTarget"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PayablesReceivablesChart() {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)
    const { data, isLoading, error, refetch } = useMonthlyTarget()

    useEffect(() => {
        if (!chartRef.current || !data) return

        // Destroy existing chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")
        if (!ctx) return

        // Create new chart
        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Receivables", "Payables"],
                datasets: [
                    {
                        data: [data.profit, data.loss],
                        backgroundColor: ["#2fb578", "#e62a49"],
                        borderColor: ["#2fb578", "#e62a49"],
                        borderWidth: 1,
                        borderRadius: 6,
                        barThickness: 60,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `$${context.parsed.y}`,
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: Math.max(data.profit, data.loss) * 1.2, // Add 20% padding
                        ticks: {
                            stepSize: Math.ceil(Math.max(data.profit, data.loss) / 5), // 5 steps
                            color: "#4f4f4f",
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12,
                            },
                        },
                        grid: {
                            color: "#ececec",
                        },
                        border: {
                            display: false,
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: "#4f4f4f",
                            font: {
                                family: "'Inter', sans-serif",
                                size: 14,
                            },
                        },
                        border: {
                            display: false,
                        },
                    },
                },
            },
        })

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="w-full bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-medium text-gray-600 uppercase">Profit and Loss</h2>
                <p className="text-gray-400 mb-6">for this month</p>
                <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#1c64f2]" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full bg-white rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-medium text-gray-600 uppercase">Profit and Loss</h2>
                <p className="text-gray-400 mb-6">for this month</p>
                <div className="h-[300px] flex flex-col items-center justify-center gap-4">
                    <p className="text-[#6b7280]">We faced some error while fetching the data. Please wait for some time and try again.</p>
                    <Button onClick={refetch} variant="primary">
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    if (!data) {
        return null
    }

    return (
        <div className="w-full bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-medium text-gray-600 uppercase">Payables and Receivables</h2>
            <p className="text-gray-400 mb-6">for this month</p>
            <div className="h-[300px]">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    )
}
