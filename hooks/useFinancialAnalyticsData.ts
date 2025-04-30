import { useState } from "react";
import axios from "axios";

interface FinancialAnalyticsData {
  stats: {
    outstanding_invoices: number;
    average_collection_period: string;
    gross_profit_margin: number;
    inventory_turnover: string;
    online_payments: number;
  };
  financials: {
    revenue: number;
    expenses: number;
    stock_value: number;
    profit_distribution: {
      profit: number;
      expenses: number;
      assets: number;
    };
  };
  change: {
    outstanding_invoices: number;
    average_collection_period: number;
    gross_profit_margin: number;
    inventory_turnover: number;
    online_payments: number;
    revenue: number;
    expenses: number;
    stock_value: number;
  };
  period: {
    start: string;
    end: string;
  };
}

export function useFinancialAnalyticsData() {
  const [dashboardData, setDashboardData] =
    useState<FinancialAnalyticsData | null>(null);
  const [isLoadingDashboardData, setIsLoadingDashboardData] = useState(false);
  const [dashboardDataError, setDashboardDataError] = useState<Error | null>(
    null,
  );

  const fetchDashboardData = async () => {
    try {
      setIsLoadingDashboardData(true);
      setDashboardDataError(null);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dashboard/financial-analytics`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      );
      setDashboardData(response.data);
    } catch (error) {
      setDashboardDataError(error as Error);
    } finally {
      setIsLoadingDashboardData(false);
    }
  };

  return {
    dashboardData,
    isLoadingDashboardData,
    dashboardDataError,
    refetchDashboardData: fetchDashboardData,
  };
}
