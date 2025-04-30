import { dashboardApi } from "@/api";
import { useEffect, useState } from "react";

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchDashboardData = () => {
    setIsLoading(true);
    dashboardApi
      ?.getAccountantDashboard()
      .then((res) => setDashboardData(res?.data))
      .catch((err) => setError(err?.response.data.detail))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  debugger;
  return {
    dashboardData,
    isLoadingDashboardData: isLoading,
    dashboardDataError: error,
  };
}
