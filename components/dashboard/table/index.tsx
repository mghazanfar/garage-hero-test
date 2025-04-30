"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    FileInput,
    Filter,
    RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox, TextInput } from "flowbite-react";
import { SearchInput } from "@/components/ui/search-input.component";

export type ColumnDef = {
    key: string;
    header: string;
    cell: (row: any) => React.ReactNode;
};

interface InvoiceTableProps {
    columns: ColumnDef[];
    data: any[];
    rowsPerPage?: number;
    totalCount?: number;
    label?: string;
    refetch?: () => void;
}

export function Table({
    columns,
    data,
    rowsPerPage = 5,
    totalCount = 1000,
    label,
    refetch,
}: InvoiceTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, data.length);
    const visibleData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCount / rowsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];

        // Always show first page
        pageNumbers.push(1);

        // Show current page and one before/after if they exist
        const beforeCurrent = currentPage - 1;
        const afterCurrent = currentPage + 1;

        // Add ellipsis if needed before current
        if (beforeCurrent > 2) {
            pageNumbers.push("ellipsis1");
        }

        // Add page before current if it's not already included
        if (beforeCurrent > 1 && beforeCurrent <= totalPages) {
            pageNumbers.push(beforeCurrent);
        }

        // Add current page if it's not the first or last
        if (currentPage > 1 && currentPage < totalPages) {
            pageNumbers.push(currentPage);
        }

        // Add page after current if it's not already included
        if (afterCurrent < totalPages) {
            pageNumbers.push(afterCurrent);
        }

        // Add ellipsis if needed after current
        if (afterCurrent < totalPages - 1) {
            pageNumbers.push("ellipsis2");
        }

        // Always show last page if it's not the first page
        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="rounded-lg bg-white shadow-md">
            <div className="mb-6 flex w-full items-center justify-between px-8 py-6">
                <h1 className="text-2xl font-bold">{label}</h1>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={refetch}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                    >
                        <FileInput className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="mb-6 flex w-full max-w-[455px] gap-4">
                <div className="relative w-full flex-initial">
                    <SearchInput value={""} onChange={() => { }} submit />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex h-10 items-center gap-1"
                >
                    <Filter className="h-4 w-4 fill-current" />
                    Filters
                </Button>
            </div>

            <div className="w-full max-w-[1138px] rounded-md">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b bg-[#f9fafb]">
                            <tr className="text-xs font-medium uppercase text-[#6b7280]">
                                <th className="w-10 px-4 py-3 text-left"></th>
                                {columns.map((column) => (
                                    <th key={column.key} className="px-4 py-3 text-left">
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {visibleData.map((row, index) => (
                                <tr key={index} className="hover:bg-[#f9fafb]">
                                    <td className="px-4 py-4">
                                        <Checkbox className="border-gray-300" />
                                    </td>
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-4 py-4 text-sm">
                                            {column.cell(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between p-6">
                <div className="text-sm text-[#6b7280]">
                    Showing{" "}
                    <span className="font-bold">
                        {startIndex + 1}-{endIndex}
                    </span>{" "}
                    of <span className="font-bold">{totalCount}</span>
                </div>
                <div className="flex items-center">
                    <div className="inline-flex">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none border-r-0"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {getPageNumbers().map((page, index) => {
                            if (page === "ellipsis1" || page === "ellipsis2") {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="flex items-center justify-center h-8 px-2 text-[#6b7280] border border-r-0 border-gray-200"
                                    >
                                        ...
                                    </span>
                                )
                            }

                            return (
                                <Button
                                    key={`page-${page}`}
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        "h-8 w-8 rounded-none border-r-0",
                                        currentPage === page && "bg-[#e1effe] text-[#1a56db] border-[#1a56db]",
                                    )}
                                    onClick={() => handlePageChange(page as number)}
                                >
                                    {page}
                                </Button>
                            )
                        })}

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
