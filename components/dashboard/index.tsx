import { ProfitAnalysis } from "./profit-analytics";
import { Table, ColumnDef } from "./table";
import { FinancialAnalytics } from "./financial-analytics";

export const DashboardAnalytics = () => {

    const columns: ColumnDef[] = [
        {
            key: "id",
            header: "ID",
            cell: (row) => <span className="font-medium">{row.id}</span>,
        },
        {
            key: "customerName",
            header: "CUSTOMER NAME",
            cell: (row) => <span>{row.customerName}</span>,
        },
        {
            key: "description",
            header: "DESCRIPTION",
            cell: (row) => <span>{row.description}</span>,
        },
        {
            key: "type",
            header: "TYPE",
            cell: (row) => {
                const typeColorMap = {
                    yellow: "bg-[#fdf6b2] text-[#723b13]",
                    blue: "bg-[#e1effe] text-[#1e429f]",
                    indigo: "bg-[#edebfe] text-[#42389d]",
                    gray: "bg-[#f3f4f6] text-[#374151]",
                    teal: "bg-[#d5f5f6] text-[#0694a2]",
                }

                return <span className={`px-2 py-1 text-xs rounded-md ${typeColorMap[row.type.color]}`}>{row.type.value}</span>
            },
        },
        {
            key: "date",
            header: "DATE",
            cell: (row) => <span>{row.date}</span>,
        },
        {
            key: "amount",
            header: "AMOUNT",
            cell: (row) => <span>{row.amount}</span>,
        },
        {
            key: "arAp",
            header: "AR/AP",
            cell: (row) => <span>{row.arAp}</span>,
        },
        {
            key: "status",
            header: "STATUS",
            cell: (row) => {
                const statusColorMap = {
                    green: "bg-[#def7ec] text-[#03543f]",
                    purple: "bg-[#edebfe] text-[#5521b5]",
                    red: "bg-[#fde8e8] text-[#9b1c1c]",
                }

                return (
                    <span className={`px-2 py-1 text-xs rounded-md ${statusColorMap[row.status.color]}`}>{row.status.value}</span>
                )
            },
        },
        {
            key: "paymentDueDate",
            header: "PAYMENT DUE DATE",
            cell: (row) => <span>{row.paymentDueDate}</span>,
        },
    ]


    const data = generateInvoiceData(25)

    // Function to generate random invoice data
    function generateInvoiceData(count: number) {
        const types = [
            { value: "Insurance", color: "yellow" },
            { value: "Business", color: "blue" },
            { value: "Agent", color: "indigo" },
            { value: "Individual", color: "gray" },
            { value: "Supplier", color: "teal" },
        ]

        const statuses = [
            { value: "Completed", color: "green" },
            { value: "In progress", color: "purple" },
            { value: "Cancelled", color: "red" },
        ]

        const customers = [
            "John Doe",
            "Jane Doe",
            "Jane Smith",
            "Charlie Davis",
            "Robert Johnson",
            "Emily Wilson",
            "Michael Brown",
            "Sarah Miller",
            "David Thompson",
            "Lisa Anderson",
        ]

        const descriptions = [
            "Car servicing",
            "Sold Parts",
            "Car Maintenance",
            "Oil Change",
            "Tire Replacement",
            "Engine Repair",
            "Brake Service",
            "Vehicle Inspection",
            "Battery Replacement",
            "Air Conditioning Service",
        ]

        const data = []

        for (let i = 1; i <= count; i++) {
            const randomType = types[Math.floor(Math.random() * types.length)]
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
            const randomCustomer = customers[Math.floor(Math.random() * customers.length)]
            const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)]

            // Generate random date in June 2024
            const day = Math.floor(Math.random() * 30) + 1
            const date = `2024-06-${day.toString().padStart(2, "0")}`

            // Generate random due date 15-30 days later
            const dueDay = Math.min(day + Math.floor(Math.random() * 15) + 15, 30)
            const dueMonth = dueDay > 30 ? 7 : 6
            const dueDate = `2024-${dueMonth.toString().padStart(2, "0")}-${(dueDay % 30 || 30).toString().padStart(2, "0")}`

            // Generate random amount between $100 and $1000
            const amount = `$${(Math.floor(Math.random() * 900) + 100).toFixed(2)}`

            data.push({
                id: `INV-${i.toString().padStart(3, "0")}`,
                customerName: randomCustomer,
                description: randomDescription,
                type: randomType,
                date: date,
                amount: amount,
                arAp: Math.random() > 0.2 ? "Receivables" : "Payables",
                status: randomStatus,
                paymentDueDate: dueDate,
            })
        }

        return data
    }


    return (
        <div className="flex flex-col gap-4">
            <FinancialAnalytics />
            <ProfitAnalysis />
            <Table columns={columns} data={data} totalCount={data?.length} label="Invoices" />
            <Table columns={columns} data={data} totalCount={data?.length} label="Receipts" />
            <Table columns={columns} data={data} totalCount={data?.length} label="Inventory" />
        </div>
    )
}