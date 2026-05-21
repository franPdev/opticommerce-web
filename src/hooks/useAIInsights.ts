import { useState, useCallback } from 'react';
import type { AIInsightsResponse } from '../types/ai.types';
import type { Product } from '../types/inventory.types';
import { analyzeInventory } from '../services/ai.service';

export const useAIInsights = () => {
  const [insights, setInsights] = useState<AIInsightsResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (products: Product[]) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeInventory({
        inventorySnapshot: products.map((p) => ({ ...p })),
      });
      setInsights(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en análisis IA');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setInsights(null);
    setError(null);
  }, []);

  return { insights, isAnalyzing, error, analyze, reset };
};
