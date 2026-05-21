import { useState, useEffect, useCallback } from 'react';
import type { Product, StockAlert } from '../types/inventory.types';
import { getProducts, getAlerts } from '../services/inventory.service';

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, alertsData] = await Promise.all([getProducts(), getAlerts()]);
      setProducts(productsData);
      setAlerts(alertsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const unreadAlerts = alerts.filter((a) => !a.isRead).length;

  return { products, alerts, isLoading, error, refetch: fetchData, unreadAlerts };
};
