import { useState, useEffect } from "react";
import { dashboardApi } from "@/api";

interface MonthlyTargetResponse {
  percentage: number;
  daysLeft: number;
  currency: string;
  targetAmount: number;
  currentAmount: number;
}

export function useMonthlyTarget() {
  const [data, setData] = useState<MonthlyTargetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await dashboardApi.getMonthlyTarget();
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch monthly target data"),
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
