"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { OtpFormComponent } from "./otp-form.component";

export function OtpFormContainer() {
  const { login: authLogin } = useAuth();
  const { verifyOtp, isLoading, error } = useLogin();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingVerificationEmail");
    if (!pendingEmail) {
      router.push("/login");
      return;
    }
    setEmail(pendingEmail);
  }, [router]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`#code-${index + 2}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      return;
    }

    try {
      const response = await verifyOtp(email, otpString);
      
      if (response.access_token && response.user) {
        // Update auth context with tokens and user data
        authLogin(
          {
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          },
          response.user
        );
        
        // Clear pending verification
        localStorage.removeItem("pendingVerificationEmail");
        
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <OtpFormComponent
      email={email}
      otp={otp}
      isLoading={isLoading}
      error={error}
      onOtpChange={handleOtpChange}
      onSubmit={handleSubmit}
    />
  );
} 