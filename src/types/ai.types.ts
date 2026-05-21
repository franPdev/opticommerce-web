export interface RiskAlert {
  id: string;
  productId: string;
  productName: string;
  riskType: RiskType;
  severity: RiskSeverity;
  daysUntilIssue: number;
  currentStock: number;
  estimatedLoss: number;
  recommendation: string;
}

export type RiskType = 'expiration' | 'trend_decline' | 'overstock' | 'seasonal_risk';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface LiquidationStrategy {
  id: string;
  targetProducts: LiquidationProduct[];
  suggestedDiscount: number;
  emailSubject: string;
  emailBody: string;
  socialMediaPost: string;
  estimatedRecovery: number;
  totalAtRisk: number;
  urgency: 'low' | 'medium' | 'high';
  validUntil: string;
}

export interface LiquidationProduct {
  productId: string;
  productName: string;
  currentPrice: number;
  suggestedPrice: number;
  quantity: number;
}

export interface PurchasePrediction {
  id: string;
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  predictedDemand: number;
  suggestedOrderQuantity: number;
  confidence: number;
  trend: 'rising' | 'stable' | 'declining';
  suggestedOrderDate: string;
  estimatedCost: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface AIInsightsResponse {
  id: string;
  timestamp: string;
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  riskAlerts: RiskAlert[];
  liquidationStrategy: LiquidationStrategy | null;
  purchasePredictions: PurchasePrediction[];
  summary: string;
  processingTimeMs: number;
}

export interface AIAnalysisRequest {
  inventorySnapshot: Record<string, unknown>[];
  dateRange?: {
    from: string;
    to: string;
  };
  focusCategories?: string[];
}
