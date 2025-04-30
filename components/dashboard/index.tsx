"use client"

import { ProfitAnalysis } from "./profit-analytics";
import { Table, ColumnDef } from "./table";
import { FinancialAnalytics } from "./financial-analytics";
import { useInvoices } from "@/hooks/useInvoices";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardAnalytics = () => {
    const { data, isLoading, error, refetch } = useInvoices();

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
                const typeColorMap: Record<string, string> = {
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
        <div className="space-y-6">
            <FinancialAnalytics />
            <ProfitAnalysis />
            <Table
                columns={columns}
                data={data.data}
                totalCount={data.total}
                label="Invoices"
            />
        </div>
    );
};