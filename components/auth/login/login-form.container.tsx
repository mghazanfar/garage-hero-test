"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { LoginFormComponent } from "./login-form.component";

export function LoginFormContainer() {
  const { login, isLoading, error } = useLogin();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await login(email, password);
      if (response.success) {
        // Store email in localStorage for OTP verification
        localStorage.setItem("pendingVerificationEmail", email);
        
        // Navigate to OTP page
        router.push("/otp");
      }
    } catch (err: any) {
      if(err?.message === "An email with a verification code has been sent to your email address."){
        // Store email in localStorage for OTP verification
        localStorage.setItem("pendingVerificationEmail", email);
        
        // Navigate to OTP page
        router.push("/otp");
      } else console.error("Login failed:", err);
    }
  };

  return (
    <LoginFormComponent
      email={email}
      password={password}
      isLoading={isLoading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
} 