"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <DashboardLayout>hello</DashboardLayout>
  );
} 