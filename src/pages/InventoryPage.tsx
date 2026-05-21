import React from 'react';
import { InventoryTable } from '../components/dashboard/InventoryTable';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { useInventoryContext } from '../context/InventoryContext';
import { Skeleton } from '../components/ui/Skeleton';

export const InventoryPage: React.FC = () => {
  const { products, alerts, isLoading } = useInventoryContext();

  if (isLoading) {
    return (
      <div className="flex flex-col" style={{ gap: '3rem' }}>
        <Skeleton height="500px" className="rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ gap: '3rem' }}>
      <InventoryTable products={products} />
      <AlertsPanel alerts={alerts} />
    </div>
  );
};
