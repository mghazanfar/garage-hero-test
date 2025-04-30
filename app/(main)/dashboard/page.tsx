"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { FinancialAnalytics } from "@/components/dashboard/financial-analytics";
import { ProfitAnalysis } from "@/components/dashboard/profit-analytics";

export default function DashboardPage() {
  const { user } = useAuth();
  const today = new Date();
  const formattedDate = format(today, "EEEE, d MMMM, yyyy");

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="">
          <h1 className="text-2xl font-bold text-[#111928] ">Welcome {user?.first_name}!</h1>
          <p className="text-[#6b7280] text-base">{formattedDate}</p>
        </div>

        <FinancialAnalytics />
        <ProfitAnalysis />
      </div>
    </DashboardLayout>
  );
} 