import { useState, useEffect } from "react";
import { dashboardApi } from "@/api";

interface Invoice {
  id: string;
  customer_name: string;
  description: string;
  type: string;
  date: string;
  amount: number;
  ar_ap: string;
  status: string;
  payment_due_date: string;
}

interface InvoicesResponse {
  data: Invoice[];
  total: number;
  page: number;
  page_size: number;
}

export function useInvoices(page: number = 1, pageSize: number = 10) {
  const [data, setData] = useState<InvoicesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await dashboardApi.getInvoices(page, pageSize);
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch invoices data"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

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
