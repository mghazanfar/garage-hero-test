"use client"

import { Table, ColumnDef } from "../table";
import { useInvoices } from "@/hooks/useInvoices";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InvoicesTable() {
    const { data, isLoading, error, refetch } = useInvoices();

    const columns: ColumnDef[] = [
        {
            key: "id",
            header: "ID",
            cell: (row) => <span className="font-medium">{row.id}</span>,
        },
        {
            key: "customer_name",
            header: "CUSTOMER NAME",
            cell: (row) => <span>{row.customer_name}</span>,
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
                const typeColorMap: Record<string, string> = {
                    "Insurance": "bg-[#fdf6b2] text-[#723b13]",
                    "Business": "bg-[#e1effe] text-[#1e429f]",
                    "Agent": "bg-[#edebfe] text-[#42389d]",
                    "Individual": "bg-[#f3f4f6] text-[#374151]",
                    "Supplier": "bg-[#d5f5f6] text-[#0694a2]",
                }

                return <span className={`px-2 py-1 text-xs rounded-md ${typeColorMap[row.type] || "bg-gray-100 text-gray-800"}`}>{row.type}</span>
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
            cell: (row) => <span>${row.amount.toFixed(2)}</span>,
        },
        {
            key: "ar_ap",
            header: "AR/AP",
            cell: (row) => <span>{row.ar_ap}</span>,
        },
        {
            key: "status",
            header: "STATUS",
            cell: (row) => {
                const statusColorMap: Record<string, string> = {
                    "Completed": "bg-[#def7ec] text-[#03543f]",
                    "In progress": "bg-[#edebfe] text-[#5521b5]",
                    "Cancelled": "bg-[#fde8e8] text-[#9b1c1c]",
                }

                return <span className={`px-2 py-1 text-xs rounded-md ${statusColorMap[row.status] || "bg-gray-100 text-gray-800"}`}>{row.status}</span>
            },
        },
        {
            key: "payment_due_date",
            header: "PAYMENT DUE DATE",
            cell: (row) => <span>{row.payment_due_date}</span>,
        },
    ];

    if (isLoading) {
        return (
            <div className="w-full shadow-md bg-white p-6 rounded-md">
                <div className="flex items-center justify-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-[#1c64f2]" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full shadow-md bg-white p-6 rounded-md">
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <p className="text-[#6b7280]">We faced some error while fetching the data. Please wait for some time and try again.</p>
                    <Button onClick={refetch} variant="primary">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <Table
            columns={columns}
            data={data.data}
            totalCount={data.total}
            label="Invoices"
            refetch={refetch}
        />
    );
} 