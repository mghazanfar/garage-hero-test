import { useState } from "react";
import axios from "axios";
import { api, authApi } from "@/api";

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

interface VerifyOtpResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    ref_id: string;
    user_type: string;
    avatar: string | null;
    email: string;
    first_name: string;
    last_name: string;
    country: string;
    dob: string;
    phone_country_code: string;
    phone_number: string;
    status: string;
    is_email_verified: string;
    permissions: {
      organization_id: string;
      org_ref_id: string;
      subdomain: string;
      roles: string[];
      on_boarded: boolean;
      kyc: any;
      on_boarding_steps: string;
      account_status: string;
    };
  };
}

interface LoginError {
  message: string;
  status?: number;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await authApi?.login(email, password);

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
      const { data } = await authApi?.verifyOtp(email, otp);

      return data;
    } catch (err) {
      const error = err as LoginError;
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, verifyOtp, isLoading, error };
}
