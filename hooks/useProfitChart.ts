import { useState, useEffect } from "react";
import { dashboardApi } from "@/api";

interface MonthlyData {
  month: string;
  profit: number;
  sales: number;
  expenses: number;
}

interface FinancialSummaryResponse {
  total_profit: number;
  total_sales: number;
  total_expenses: number;
  profit_rate: number;
  time_period: string;
  monthly_data: MonthlyData[];
}

export function useProfitChart() {
  const [data, setData] = useState<FinancialSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await dashboardApi.getFinancialSummary();
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch financial summary"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
