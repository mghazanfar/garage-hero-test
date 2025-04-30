"use client"

import { ProfitAnalysis } from "./profit-analytics";
import { FinancialAnalytics } from "./financial-analytics";
import { InvoicesTable } from "./invoices";
import { ReceiptsTable } from "./receipts";
import { InventoryTable } from "./inventory";
export const DashboardAnalytics = () => {
    return (
        <div className="space-y-6">
            <FinancialAnalytics />
            <ProfitAnalysis />
            <InvoicesTable />
            <ReceiptsTable />
            <InventoryTable />
        </div>
    );
};