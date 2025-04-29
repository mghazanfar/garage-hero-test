"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "isAuthenticated=false; path=/";
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="rounded-lg border p-8 shadow-lg">
        <p className="mb-4">Welcome to your dashboard!</p>
        <Button onClick={handleLogout} className="bg-ghred-500 hover:bg-ghred-600">
          Logout
        </Button>
      </div>
    </div>
  );
} 