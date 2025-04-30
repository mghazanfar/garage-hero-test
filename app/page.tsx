"use client";

import { DarkThemeToggle } from "flowbite-react";
import { TestSignupComponent } from "@/components/auth/signup";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl dark:text-white">GARAGE-HERO Test</h1>
        <DarkThemeToggle />
      </div>
      <TestSignupComponent />
    </main>
  );
}
