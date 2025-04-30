import { useState } from "react";
import axios from "axios";


export interface VerifyOtpResponse {
    success: boolean;
    message?: string;
    data?: {
      token: string;
      user: {
        id: string;
        email: string;
      };
    };
  }
  
  export interface VerifyOtpError {
    message: string;
    status?: number;
  }

interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: {
      id: string;
      email: string;
    };
    requires_otp?: boolean;
  };
}

interface LoginError {
  message: string;
  status?: number;
}

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "api_key": process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY,
  },
});

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post<LoginResponse>("/api/v1/user/login", {
        email,
        password,
        user_type: "root"
      });

      if (!data.success) {
        throw {
          message: data.message || "Login failed",
          status: 400,
        };
      }

      return data;
    } catch (err) {
      const error = err as LoginError;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post<VerifyOtpResponse>("/api/v1/user/verify-otp", {
        email,
        otp,
        user_type: "root"
      });
debugger
      if (!data.success) {
        throw {
          message: data.message || "OTP verification failed",
          status: 400,
        };
      }

      return data;
    } catch (err) {
      const error = err as any;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, verifyOtp };
} 