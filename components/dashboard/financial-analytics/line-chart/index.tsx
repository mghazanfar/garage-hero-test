"use client"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

interface ChartComponentProps {
    title: string
    value: string
    change: number
    isPositive: boolean
    data: number[]
}

export function LineChartComponent({ title, value, change, isPositive, data }: ChartComponentProps) {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]

    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: title,
                data: data,
                borderColor: "#1c64f2",
                backgroundColor: (context: any) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return null
                    }

                    // Create gradient
                    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom)
                    gradient.addColorStop(0, "rgba(28, 100, 242, 0.3)")
                    gradient.addColorStop(1, "rgba(28, 100, 242, 0)")

                    return gradient
                },
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
                min: Math.min(...data) * 0.8, // Add some padding at the bottom
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
        },
    }

    return (
        <div className="col-span-1 border-r pr-8">
            <div className="flex justify-between items-center">
                <h3 className="text-[#6b7280] font-normal text-base">{title}</h3>
                <div
                    className={`px-2 py-1 ${isPositive ? "bg-[#def7ec] text-[#03543f]" : "bg-[#fde8e8] text-[#9b1c1c]"} text-xs font-medium rounded`}
                >
                    {isPositive ? "+" : "-"}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-2xl font-bold text-[#111928] mt-1">{value}</p>
            <div className="h-16 w-full mt-2">
                <Line data={chartData} options={options} />
            </div>
        </div>
    )
}
