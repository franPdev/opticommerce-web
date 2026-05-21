export const APP_NAME = 'OptiStock AI';
export const APP_VERSION = '1.0.0';

export const WEBHOOK_BASE_URL = import.meta.env.VITE_WEBHOOK_BASE_URL || 'https://n8n.example.com';

export const WEBHOOK_ENDPOINTS = {
  execute_promotion: '/webhook/execute-promotion',
  create_purchase_order: '/webhook/create-purchase-order',
  alert_notification: '/webhook/alert-notification',
} as const;

export const AI_CONFIG = {
  apiUrl: import.meta.env.VITE_AI_API_URL || '',
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
  model: 'gpt-4o',
  simulateDelay: 2000,
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  electronics: '#6366F1',
  clothing: '#8B5CF6',
  food: '#F59E0B',
  beverages: '#06B6D4',
  home: '#10B981',
  beauty: '#EC4899',
  sports: '#EF4444',
  toys: '#F97316',
};
