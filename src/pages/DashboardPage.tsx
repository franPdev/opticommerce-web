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
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="140px" className="rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          <Skeleton height="350px" className="lg:col-span-2 rounded-2xl" />
          <Skeleton height="350px" className="rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {/* KPIs */}
      <KPIGrid products={products} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <div className="lg:col-span-2 min-w-0 w-full overflow-hidden">
          <SalesChart />
        </div>
        <div className="min-w-0 w-full overflow-hidden">
          <StockStatusChart />
        </div>
      </div>

      {/* Table + Alerts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <div className="lg:col-span-2 min-w-0 w-full overflow-hidden">
          <InventoryTable products={products} compact />
        </div>
        <div className="min-w-0 w-full overflow-hidden">
          <AlertsPanel alerts={alerts} compact />
        </div>
      </div>
    </div>
  );
};
