export type WebhookAction = 'execute_promotion' | 'create_purchase_order' | 'alert_notification';

export interface WebhookPayload {
  action: WebhookAction;
  timestamp: string;
  data: WebhookPromotionData | WebhookPurchaseOrderData | WebhookAlertData;
  metadata: {
    source: 'optistock-ai';
    userId: string;
    version: string;
  };
}

export interface WebhookPromotionData {
  type: 'promotion';
  products: {
    productId: string;
    productName: string;
    originalPrice: number;
    discountedPrice: number;
    quantity: number;
  }[];
  emailSubject: string;
  emailBody: string;
  socialMediaPost: string;
  targetAudience: string;
  validUntil: string;
}

export interface WebhookPurchaseOrderData {
  type: 'purchase_order';
  supplier: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitCost: number;
  }[];
  totalCost: number;
  requestedDeliveryDate: string;
  priority: 'normal' | 'urgent';
}

export interface WebhookAlertData {
  type: 'alert';
  alertId: string;
  severity: string;
  message: string;
  productId: string;
  productName: string;
  channel: 'email' | 'slack' | 'sms';
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  webhookId?: string;
  executedAt?: string;
}

export interface WebhookConfig {
  baseUrl: string;
  endpoints: Record<WebhookAction, string>;
  headers: Record<string, string>;
}
