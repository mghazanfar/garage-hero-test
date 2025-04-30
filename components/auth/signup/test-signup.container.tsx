"use client";

import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import { TestSignupComponent } from "./test-signup.component";

export function TestSignupContainer() {
  const { signup, isLoading, error } = useSignup();
  const [result, setResult] = useState<string | null>(null);

  const handleSignup = async () => {
    try {
      const response = await signup({
        first_name: "Test",
        last_name: "User",
        email: "mhmmdghznfrali@gmail.com",
        country: "AE",
        lang: JSON.stringify({ acceptedLang: "en", browserLang: "en-US" }),
        phone_country_code: "971",
        phone_number: "0000000000",
        dob: "1993-03-03T20:00:00.000",
        password: "5Garage!!!!!",
        user_type: "root"
      });

      setResult(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <TestSignupComponent
      isLoading={isLoading}
      error={error}
      result={result}
      onSignup={handleSignup}
    />
  );
} 