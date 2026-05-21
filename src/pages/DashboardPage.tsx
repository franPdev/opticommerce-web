import React from 'react';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { SalesChart } from '../components/dashboard/SalesChart';
import { StockStatusChart } from '../components/dashboard/StockStatusChart';
import { InventoryTable } from '../components/dashboard/InventoryTable';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { Skeleton } from '../components/ui/Skeleton';
import { useInventoryContext } from '../context/InventoryContext';

export const DashboardPage: React.FC = () => {
  const { products, alerts, isLoading } = useInventoryContext();

  if (isLoading) {
    return (
      <div className="flex flex-col" style={{ gap: '3rem' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '2.5rem' }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="140px" className="rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '2.5rem' }}>
          <Skeleton height="350px" className="lg:col-span-2 rounded-2xl" />
          <Skeleton height="350px" className="rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ gap: '3rem' }}>
      {/* KPIs */}
      <KPIGrid products={products} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '2.5rem' }}>
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <StockStatusChart />
      </div>

      {/* Table + Alerts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '2.5rem' }}>
        <div className="lg:col-span-2">
          <InventoryTable products={products} compact />
        </div>
        <AlertsPanel alerts={alerts} compact />
      </div>
    </div>
  );
};
