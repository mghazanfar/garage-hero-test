"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function PayablesReceivablesChart() {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    useEffect(() => {
        if (!chartRef.current) return

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
                        data: [105, 80],
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
                            label: (context) => `${context.parsed.y}`,
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 130,
                        ticks: {
                            stepSize: 20,
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
    }, [])

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
