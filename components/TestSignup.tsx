"use client";

import { Button, Alert } from "flowbite-react";
import { useSignup } from "@/hooks/useSignup";
import { useState } from "react";

export function TestSignup() {
  const { signup, isLoading, error } = useSignup();
  const [result, setResult] = useState<string | null>(null);

  const handleSignup = async () => {
    try {
      const response = await signup({
        first_name: "Test",
        last_name: "User",
        email: "depok34976@npo2.com",
        country: "AE",
        lang: JSON.stringify({ acceptedLang: "en", browserLang: "en-US" }),
        phone_country_code: "971",
        phone_number: "0000000000",
        dob: "1993-03-03T20:00:00.000",
        password: "TestUser2024!_!_",
        user_type: "root"
      });

      setResult(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="p-4">
      <Button 
        onClick={handleSignup} 
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? "Creating user..." : "Create Test User"}
      </Button>

      {error && (
        <Alert color="failure" className="mb-4">
          {error.message}
        </Alert>
      )}

      {result && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
} 