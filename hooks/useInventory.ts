import { useState, useEffect } from "react";
import { dashboardApi } from "@/api";

interface Inventory {
  id: string;
  item_name: string;
  description: string;
  category: string;
  quantity: number;
  unit_price: number;
  total_value: number;
  status: string;
  last_updated: string;
}

interface InventoryResponse {
  data: Inventory[];
  total: number;
  page: number;
  page_size: number;
}

export function useInventory(page: number = 1, pageSize: number = 10) {
  const [data, setData] = useState<InventoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await dashboardApi.getInventory(page, pageSize);
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch inventory data"),
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
