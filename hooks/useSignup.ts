import { useState } from "react";
import axios from "axios";

interface SignupResponse {
  success: boolean;
  message?: string;
  data?: {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
}

interface SignupError {
  message: string;
  status?: number;
}

interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  lang: string;
  phone_country_code: string;
  phone_number: string;
  dob: string;
  password: string;
  user_type: string;
}

// Create axios instance with base URL and default headers
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "api_key": process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY,
  },
});

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SignupError | null>(null);

  const signup = async (payload: SignupPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post<SignupResponse>("/api/v1/user/signup", payload);

      if (!data.success) {
        throw {
          message: data.message || "Signup failed",
          status: 400,
        };
      }

      return data;
    } catch (err) {
      const error = err as SignupError;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
} 