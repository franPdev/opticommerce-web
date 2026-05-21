import React, { createContext, useContext, type ReactNode } from 'react';
import type { AIInsightsResponse } from '../types/ai.types';
import type { Product } from '../types/inventory.types';
import { useAIInsights } from '../hooks/useAIInsights';

interface AIContextValue {
  insights: AIInsightsResponse | null;
  isAnalyzing: boolean;
  error: string | null;
  analyze: (products: Product[]) => Promise<void>;
  reset: () => void;
}

const AIContext = createContext<AIContextValue | null>(null);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ai = useAIInsights();

  return (
    <AIContext.Provider value={ai}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = (): AIContextValue => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAIContext must be used within an AIProvider');
  }
  return context;
};
