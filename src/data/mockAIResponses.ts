import type { AIInsightsResponse } from '../types/ai.types';

export const mockAIResponse: AIInsightsResponse = {
  id: 'AI-RES-001',
  timestamp: '2026-05-18T15:30:00Z',
  status: 'complete',
  summary: 'He analizado 20 productos en tu inventario. Detecté 3 alertas de riesgo críticas, generé una estrategia de liquidación para 4 productos estancados y calculé predicciones de compra para los próximos 30 días.',
  processingTimeMs: 2340,
  riskAlerts: [
    {
      id: 'RISK-001', productId: 'PRD-014', productName: 'Barras Energéticas x12',
      riskType: 'expiration', severity: 'critical', daysUntilIssue: 10, currentStock: 8, estimatedLoss: 127.92,
      recommendation: 'Liquidar inmediatamente con 50% de descuento. Promoción flash de 48hs puede mover todo el stock.',
    },
    {
      id: 'RISK-002', productId: 'PRD-004', productName: 'Proteína Whey 2kg Chocolate',
      riskType: 'expiration', severity: 'high', daysUntilIssue: 28, currentStock: 85, estimatedLoss: 5270.00,
      recommendation: 'Descuento progresivo: 20% ahora, 35% en 2 semanas. Crear bundle con shaker. Email marketing segmentado.',
    },
    {
      id: 'RISK-003', productId: 'PRD-003', productName: 'Camiseta Running DryFit',
      riskType: 'overstock', severity: 'high', daysUntilIssue: 0, currentStock: 320, estimatedLoss: 4800.00,
      recommendation: 'Flash sale 30% en 100 unidades. Bundle "kit running". Considerar marketplace externo para 50 unidades.',
    },
    {
      id: 'RISK-004', productId: 'PRD-009', productName: 'Funda Silicona Universal',
      riskType: 'trend_decline', severity: 'medium', daysUntilIssue: 0, currentStock: 540, estimatedLoss: 1350.00,
      recommendation: 'Tendencia cayendo 15% mensual. Reducir precio 40% para mover 200 unidades. No reordenar este SKU.',
    },
    {
      id: 'RISK-005', productId: 'PRD-012', productName: 'Juego de Mesa Estrategia',
      riskType: 'seasonal_risk', severity: 'low', daysUntilIssue: 45, currentStock: 88, estimatedLoss: 792.00,
      recommendation: 'Temporada baja (mayo-agosto). No reordenar hasta septiembre.',
    },
  ],
  liquidationStrategy: {
    id: 'LIQ-001',
    targetProducts: [
      { productId: 'PRD-003', productName: 'Camiseta Running DryFit', currentPrice: 45.00, suggestedPrice: 31.50, quantity: 100 },
      { productId: 'PRD-004', productName: 'Proteína Whey 2kg Chocolate', currentPrice: 62.00, suggestedPrice: 49.60, quantity: 85 },
      { productId: 'PRD-009', productName: 'Funda Silicona Universal', currentPrice: 12.99, suggestedPrice: 7.79, quantity: 200 },
      { productId: 'PRD-014', productName: 'Barras Energéticas x12', currentPrice: 15.99, suggestedPrice: 7.99, quantity: 8 },
    ],
    suggestedDiscount: 30,
    emailSubject: '🔥 ¡Ofertas Flash OptiStock! Hasta 50% OFF en productos seleccionados',
    emailBody: '¡Hola!\n\nOfertas imperdibles por tiempo limitado:\n\n🏃 Camiseta Running DryFit — $31.50 (antes $45.00)\n💪 Proteína Whey 2kg — $49.60 (antes $62.00)\n📱 Funda Silicona — $7.79 (antes $12.99)\n⚡ Barras Energéticas — $7.99 (antes $15.99)\n\n⏰ Válido hasta agotar stock.\n\nEquipo OptiStock',
    socialMediaPost: '🔥 OFERTAS FLASH 🔥\nHasta 50% OFF en productos seleccionados!\n🏃 Running gear desde $31.50\n💪 Proteína premium -20%\n⏰ Stock limitado\n#Ofertas #Flash #Fitness',
    estimatedRecovery: 8523.00,
    totalAtRisk: 12339.92,
    urgency: 'high',
    validUntil: '2026-05-25T23:59:59Z',
  },
  purchasePredictions: [
    { id: 'PRED-001', productId: 'PRD-002', productName: 'Cargador USB-C 65W', category: 'Electrónica', currentStock: 12, predictedDemand: 204, suggestedOrderQuantity: 200, confidence: 0.92, trend: 'rising', suggestedOrderDate: '2026-05-19', estimatedCost: 2500.00, priority: 'urgent' },
    { id: 'PRED-002', productId: 'PRD-006', productName: 'Yoga Mat Premium 6mm', category: 'Deportes', currentStock: 0, predictedDemand: 102, suggestedOrderQuantity: 100, confidence: 0.88, trend: 'stable', suggestedOrderDate: '2026-05-19', estimatedCost: 1400.00, priority: 'urgent' },
    { id: 'PRED-003', productId: 'PRD-016', productName: 'Pantalón Cargo Outdoor', category: 'Ropa', currentStock: 0, predictedDemand: 66, suggestedOrderQuantity: 80, confidence: 0.85, trend: 'stable', suggestedOrderDate: '2026-05-20', estimatedCost: 2000.00, priority: 'high' },
    { id: 'PRED-004', productId: 'PRD-008', productName: 'Café Premium Molido 1kg', category: 'Bebidas', currentStock: 22, predictedDemand: 165, suggestedOrderQuantity: 150, confidence: 0.91, trend: 'rising', suggestedOrderDate: '2026-05-20', estimatedCost: 1125.00, priority: 'high' },
    { id: 'PRED-005', productId: 'PRD-018', productName: 'Mouse Ergonómico Wireless', category: 'Electrónica', currentStock: 28, predictedDemand: 105, suggestedOrderQuantity: 80, confidence: 0.87, trend: 'rising', suggestedOrderDate: '2026-05-22', estimatedCost: 1440.00, priority: 'medium' },
    { id: 'PRED-006', productId: 'PRD-011', productName: 'Crema Hidratante Corporal', category: 'Belleza', currentStock: 18, predictedDemand: 90, suggestedOrderQuantity: 80, confidence: 0.83, trend: 'stable', suggestedOrderDate: '2026-05-22', estimatedCost: 520.00, priority: 'medium' },
  ],
};
