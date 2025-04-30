"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
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
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (tokens: { accessToken: string; refreshToken: string }, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for tokens in cookies
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    const userData = localStorage.getItem("userData");
    
    if (accessToken && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (tokens: { accessToken: string; refreshToken: string }, userData: User) => {
    // Store tokens in cookies
    document.cookie = `auth_token=${tokens.accessToken}; path=/; secure; samesite=strict`;
    document.cookie = `refresh_token=${tokens.refreshToken}; path=/; secure; samesite=strict`;
    document.cookie = "isAuthenticated=true; path=/";
    
    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    // Clear cookies
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Clear localStorage
    localStorage.removeItem("userData");
    
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 