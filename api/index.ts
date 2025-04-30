import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    api_key: process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY,
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  if (token) {
    config.headers.token = `${token}`;
  }

  return config;
});

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/api/v1/user/login", { email, password, user_type: "root" }),
  signup: (userData: any) => api.post("/api/v1/user/create", userData),
  verifyOtp: (email: string, otp: string) =>
    api.post("/api/v1/user/verify-otp", { email, otp, user_type: "root" }),
};

export const dashboardApi = {
  getAccountantDashboard: () => api.get("/api/v1/dashboard/accountant"),
  getFinancialSummary: () =>
    api.get(
      "/api/v1/dashboard/accountant/financial-summary?period=last%206%20months",
    ),
  getMonthlyTarget: () => api.get("/api/v1/dashboard/accountant/pl-graph"),
};

export { api };
