"use client";

import { Button, Alert } from "flowbite-react";
import Link from "next/link";

interface TestSignupComponentProps {
  isLoading: boolean;
  error: { message: string } | null;
  result: string | null;
  onSignup: () => void;
}

export function TestSignupComponent({
  isLoading,
  error,
  result,
  onSignup,
}: TestSignupComponentProps) {
  return (
    <div className="p-4 flex flex-col gap-4 max-w-md mx-auto justify-center items-center">
      {error && (
        <Alert color="failure" className="mb-4">
          {error.message}
        </Alert>
      )}
      <Button 
        onClick={onSignup} 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Creating user..." : "Create Test User"}
      </Button>
      <Link href="/login">
        <Button 
          className="bg-red-700 w-full"
        >
          Login
        </Button>
      </Link>

      {result && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
} 