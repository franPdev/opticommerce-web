import React from 'react';
import { AIInsightsPanel } from '../components/ai/AIInsightsPanel';
import { useInventoryContext } from '../context/InventoryContext';
import { useAIContext } from '../context/AIContext';

export const AIInsightsPage: React.FC = () => {
  const { products } = useInventoryContext();
  const { insights, isAnalyzing, analyze } = useAIContext();

  return (
    <AIInsightsPanel
      insights={insights}
      isAnalyzing={isAnalyzing}
      onAnalyze={analyze}
      products={products}
    />
  );
};
