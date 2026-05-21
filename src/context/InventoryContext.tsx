import React, { createContext, useContext, type ReactNode } from 'react';
import type { Product, StockAlert } from '../types/inventory.types';
import { useInventory } from '../hooks/useInventory';

interface InventoryContextValue {
  products: Product[];
  alerts: StockAlert[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  unreadAlerts: number;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const inventory = useInventory();

  return (
    <InventoryContext.Provider value={inventory}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = (): InventoryContextValue => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventoryContext must be used within an InventoryProvider');
  }
  return context;
};
