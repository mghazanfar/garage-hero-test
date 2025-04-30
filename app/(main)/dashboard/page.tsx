"use client";

import { DashboardAnalytics } from "@/components/dashboard";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";

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
        <DashboardAnalytics />
      </div>
    </DashboardLayout>
  );
} 