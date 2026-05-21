import type { AIInsightsResponse, AIAnalysisRequest } from '../types/ai.types';
import { mockAIResponse } from '../data/mockAIResponses';
import { AI_CONFIG } from '../utils/constants';

/**
 * Simulates an AI analysis of the current inventory.
 * In production, this would call an LLM API (OpenAI, Gemini, etc.)
 */
export const analyzeInventory = async (
  _request: AIAnalysisRequest
): Promise<AIInsightsResponse> => {
  // Simulate API processing delay
  await new Promise((resolve) => setTimeout(resolve, AI_CONFIG.simulateDelay));

  // --- PRODUCTION IMPLEMENTATION ---
  // Uncomment and configure for real LLM integration:
  //
  // const response = await fetch(AI_CONFIG.apiUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
  //   },
  //   body: JSON.stringify({
  //     model: AI_CONFIG.model,
  //     messages: [
  //       {
  //         role: 'system',
  //         content: `Eres un agente de IA especializado en gestión de inventario retail.
  //         Analiza el inventario proporcionado y devuelve:
  //         1. Alertas de riesgo (productos por vencer, tendencias negativas, sobrestock)
  //         2. Estrategia de liquidación con copy de marketing
  //         3. Predicciones de compra para los próximos 30 días
  //         Responde en formato JSON estructurado.`
  //       },
  //       {
  //         role: 'user',
  //         content: JSON.stringify(request.inventorySnapshot)
  //       }
  //     ],
  //     response_format: { type: 'json_object' }
  //   }),
  // });
  //
  // const data = await response.json();
  // return parseAIResponse(data);

  // Return simulated response
  return {
    ...mockAIResponse,
    id: `AI-RES-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Checks if AI service is configured for real API calls
 */
export const isAIConfigured = (): boolean => {
  return Boolean(AI_CONFIG.apiUrl && AI_CONFIG.apiKey);
};
