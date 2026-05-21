import { mockProducts, mockAlerts } from '../data/mockInventory';
import type { Product, StockAlert } from '../types/inventory.types';

export const getProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
};

export const getAlerts = async (): Promise<StockAlert[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockAlerts;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockProducts.find((p) => p.id === id);
};

export const getKPIStats = (products: Product[]) => {
  const totalStockValue = products.reduce((sum, p) => sum + p.currentStock * p.price, 0);
  const atRiskProducts = products.filter((p) => ['expiring', 'overstock', 'critical'].includes(p.status));
  const stockBreakAlerts = products.filter((p) => ['critical', 'out_of_stock'].includes(p.status));
  const avgSalesVelocity = products.reduce((sum, p) => sum + p.salesVelocity, 0) / products.length;
  const projectedSales30d = Math.round(avgSalesVelocity * 30 * products.length * 0.4);

  return {
    totalStockValue,
    atRiskCount: atRiskProducts.length,
    stockBreakCount: stockBreakAlerts.length,
    projectedSales30d,
  };
};
