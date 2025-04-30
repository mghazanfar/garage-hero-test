"use client"

import { Table, ColumnDef } from "../table";
import { useInventory } from "@/hooks/useInventory";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InventoryTable() {
    const { data, isLoading, error, refetch } = useInventory();

    const columns: ColumnDef[] = [
        {
            key: "id",
            header: "ID",
            cell: (row) => <span className="font-medium">{row.id}</span>,
        },
        {
            key: "item_name",
            header: "ITEM NAME",
            cell: (row) => <span>{row.item_name}</span>,
        },
        {
            key: "category",
            header: "CATEGORY",
            cell: (row) => {
                const categoryColorMap: Record<string, string> = {
                    "Parts": "bg-[#fdf6b2] text-[#723b13]",
                    "Fluids": "bg-[#e1effe] text-[#1e429f]",
                    "Accessories": "bg-[#edebfe] text-[#42389d]",
                }

                return <span className={`px-2 py-1 text-xs rounded-md ${categoryColorMap[row.category] || "bg-gray-100 text-gray-800"}`}>{row.category}</span>
            },
        },
        {
            key: "stock_level",
            header: "STOCK LEVEL",
            cell: (row) => <span>{row.stock_level}</span>,
        },
        {
            key: "unit_price",
            header: "UNIT PRICE",
            cell: (row) => <span>${row.unit_price.toFixed(2)}</span>,
        },
        {
            key: "total_value",
            header: "TOTAL VALUE",
            cell: (row) => <span>${row.total_value.toFixed(2)}</span>,
        },
        {
            key: "status",
            header: "STATUS",
            cell: (row) => {
                const statusColorMap: Record<string, string> = {
                    "In Stock": "bg-[#def7ec] text-[#03543f]",
                    "Low Stock": "bg-[#fdf6b2] text-[#723b13]",
                    "Out of Stock": "bg-[#fde8e8] text-[#9b1c1c]",
                }

                return <span className={`px-2 py-1 text-xs rounded-md ${statusColorMap[row.status] || "bg-gray-100 text-gray-800"}`}>{row.status}</span>
            },
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
            label="Inventory"
            refetch={refetch}
        />
    );
} 