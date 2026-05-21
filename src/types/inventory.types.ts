export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  cost: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  expirationDate?: string;
  lastRestockDate: string;
  supplier: string;
  status: StockStatus;
  imageUrl?: string;
  salesVelocity: number; // units per day
  daysOfSupply: number;
}

export type ProductCategory =
  | 'electronics'
  | 'clothing'
  | 'food'
  | 'beverages'
  | 'home'
  | 'beauty'
  | 'sports'
  | 'toys';

export type StockStatus =
  | 'healthy'
  | 'low'
  | 'critical'
  | 'overstock'
  | 'expiring'
  | 'out_of_stock';

export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export type AlertType =
  | 'low_stock'
  | 'out_of_stock'
  | 'expiring_soon'
  | 'overstock'
  | 'trend_decline'
  | 'demand_spike';

export type AlertSeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export interface SalesDataPoint {
  month: string;
  sales: number;
  revenue: number;
  projected?: number;
  projectedRevenue?: number;
}

export interface CategoryDistribution {
  category: ProductCategory;
  label: string;
  count: number;
  value: number;
  color: string;
}

export interface KPIData {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  color: 'primary' | 'success' | 'warning' | 'danger' | 'accent';
}

export interface InventoryFilters {
  search: string;
  category: ProductCategory | 'all';
  status: StockStatus | 'all';
  sortBy: keyof Product;
  sortOrder: 'asc' | 'desc';
}
